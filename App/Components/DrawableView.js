import _ from 'lodash'
import React from 'react'
import { View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import Expo from 'expo'
import simplify from 'simplify-js'
import smooth from 'chaikin-smooth'

function extractPolyPoints (polyPoints) {
  return polyPoints.replace(/[^e]-/, ' -').split(/(?:\s+|\s*,\s*)/g).join(' ')
}

const defaultPoints = [
  [-0.3930704898446834, -0.9378733572281959],
  [-0.3422939068100359, -0.8452807646356033],
  [-0.24074074074074076, -0.6600955794504182],
  [-0.15053763440860216, -0.5083632019115891],
  [-0.07168458781362005, -0.39008363201911594],
  [0.08243727598566308, -0.33034647550776586],
  [0.31182795698924726, -0.3291517323775388],
  [0.42652329749103934, -0.3285543608124253]
]

export default class DrawableView extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    points: PropTypes.array
  }

  state = {
    width: null,
    height: null,
    animatedPercentage: new Animated.Value(0)
  }

  constructor (props) {
    super(props)

    if (!_.isEmpty(props.points)) {
      this.points = props.points
    } else {
      this.points = _.map(defaultPoints, ([x, y]) => ({x, y}))
    }

    this.state.animatedPercentage.addListener((a) => {
      this.draw(a.value)
    })

    this.directionAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animatedPercentage, {
          toValue: 100, duration: 1200, delay: 2000
        })
        // Animated.timing(this.state.animatedPercentage, {
        //   toValue: 0, duration: 100, delay: 100
        // })
      ]))

    this.directionAnimation.start()
  }

  createArrow (points) {
    if (points.length < 2) {
      return []
    }

    // last two points
    const {x: x1, y: y1} = points[points.length - 2]
    const {x: x2, y: y2} = points[points.length - 1]
    const l = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

    const lExpected = 0.005 + 0.015 * Math.min(points.length, 10)
    const a = 0.8
    const x3 = (-(x2 - x1) * Math.cos(a) + (y2 - y1) * Math.sin(a)) * (lExpected / l) + x2
    const y3 = (-(x2 - x1) * Math.sin(a) - (y2 - y1) * Math.cos(a)) * (lExpected / l) + y2
    const x4 = (-(x2 - x1) * Math.cos(-a) + (y2 - y1) * Math.sin(-a)) * (lExpected / l) + x2
    const y4 = (-(x2 - x1) * Math.sin(-a) - (y2 - y1) * Math.cos(-a)) * (lExpected / l) + y2

    const expectedMove = 0.1

    const x0 = x2 + expectedMove * (x2 - x1) / l
    const y0 = y2 + expectedMove * (y2 - y1) / l
    return [
      {x: x3, y: y3},
      {x: x0, y: y0},
      {x: x4, y: y4}
    ]
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEmpty(nextProps.points)) {
      this.points = nextProps.points
    }
  }

  onLayout = (evt) => {
    // this.line_x_width = this.base_line_width / evt.nativeEvent.layout.width;
    // this.line_y_width = this.base_line_width / evt.nativeEvent.layout.height;
    this.setState({
      width: evt.nativeEvent.layout.width,
      height: evt.nativeEvent.layout.height
    })
  }

  addPoint (location) {
    const { width, height } = this.state
    var x = 2.0 * (location.locationX * 1.0 / width - 0.5)
    var y = 2.0 * (-location.locationY * 1.0 / height + 0.5)

    this.points.push({x, y})
  }

  onResponderGrant = (evt) => {
    this.directionAnimation.stop()

    this.points = []
    this.addPoint(evt.nativeEvent)
  }

  onResponderMove = (evt) => {
    this.addPoint(evt.nativeEvent)
    this.draw(100)
  }

  onResponderRelease = (evt) => {
    this.addPoint(evt.nativeEvent)
    this.preprocess()
    this.draw(100)

    this.directionAnimation.reset()
    this.directionAnimation.start()
  }

  preprocess = () => {
    // update points
    if (this.points.length < 2) {
      return
    }

    this.points = _.chain(this.points)
      .thru(points => simplify(points, 0.009))
      .map(({x, y}) => ([x, y]))
      .thru(smooth)
      .map(point => ({x: point[0], y: point[1]}))
      .value()
  }

  draw = (percentage) => {
    if (this.svgPath) {
      const d = this.createPropsD(this.points)
      this.svgPath.setNativeProps({d})
    }
    if (this.animatedSvgPath) {
      const points = this.take(this.points, percentage)
      const d = this.createPropsD(points)
      this.animatedSvgPath.setNativeProps({d})

      if (this.arrowPath) {
        const arrows = this.createArrow(points)
        const dArrow = this.createPropsD(arrows, 100)
        this.arrowPath.setNativeProps({d: dArrow})
      }
    }
  }

  pointsToString = (points, w, h) => {
    return _.chain(points)
      .map(({x, y}) => ({
        x: (1 + x) * w / 2,
        y: (1 - y) * h / 2
      }))
      .reduce((acc, {x, y}, i) => acc + x + ',' + y + ' ', '')
      .value()
  }

  take (points, percentage) {
    return _.take(points, points.length * percentage / 100)
  }

  createPropsD (points) {
    const { width, height } = this.state
    const s = this.pointsToString(points, width, height)
    // https://github.com/react-native-community/react-native-svg/blob/master/elements/Polygon.js
    return `M${extractPolyPoints(s)}`
  }

  render () {
    const { width, height } = this.state
    const { editable = false } = this.props
    const strokeWidth = width / 22
    return (
      <View
        style={[this.props.style]}
        onStartShouldSetResponder={(evt) => editable}
        onMoveShouldSetResponder={(evt) => editable}
        onLayout={this.onLayout}
        onResponderMove={this.onResponderMove}
        onResponderGrant={this.onResponderGrant}
        onResponderRelease={this.onResponderRelease}
      >
        { !!width && !!height && (
          <Expo.Svg height={height} width={width} style={{backgroundColor: 'transparent'}}>
            <Expo.Svg.Path
              ref={ref => (this.svgPath = ref)}
              d=''
              fill='none'
              stroke='#fff'
              strokeOpacity={0.3}
              strokeWidth={strokeWidth / 4}
              strokeDasharray={[10, 5]}
            />
            <Expo.Svg.Path
              ref={ref => (this.animatedSvgPath = ref)}
              d=''
              fill='none'
              stroke='#fff'
              strokeOpacity={0.8}
              strokeWidth={strokeWidth}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <Expo.Svg.Path
              ref={ref => (this.arrowPath = ref)}
              d=''
              fill='none'
              stroke={'#fff'}
              strokeOpacity={1}
              strokeWidth={strokeWidth / 1.5}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </Expo.Svg>
        )}
      </View>
    )
  }
}

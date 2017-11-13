import _ from 'lodash'
import React from 'react'
import { Dimensions, View, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel'
import { Ionicons } from '@expo/vector-icons'

import RouteView from '../Components/RouteView'
import RoundedButton from '../Components/RoundedButton'
import MapPopup from '../Components/MapPopup'

import DirectionDetail from '../Components/DirectionDetail'
import DirectionPlaceholder from '../Components/DirectionPlaceholder'

// Actions
import DirectionActions from '../Redux/DirectionRedux'
import PaveActions from '../Redux/PaveRedux'
import CurrentActions from '../Redux/CurrentRedux'

import { Metrics } from '../Themes'
import styles from './Styles/NavigationScreenStyle'

class NavigationScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({ header: null })
  state = {
    isEditing: false,
    carouselIndex: 0
  }

  constructor (props) {
    super(props)
    this.removingOpacity = new Animated.Value(0)
  }

  componentDidMount () {
    // const { getDirection, directionId } = this.props
    // getDirection(directionId)
    const { editMode = false } = _.get(this.props, ['navigation', 'state', 'params'], {})
    if (editMode !== this.state.isEditing) {
      this.setState({isEditing: editMode})
    }
  }

  componentWillReceiveProps (nextProps) {

  }

  enterEditMode () {
    this.setState((state) => ({
      ...state,
      isEditing: !state.isEditing
    }))
  }

  handleOpenMap = (location) => {
    this.setState({ mapLocation: location })
    this.mapView.popupDialog.show()
  }

  handleCloseMap = () => {

  }

  handleEditSaveAndExit = () => {
    const { directions = [], saveRoute } = this.props

    saveRoute(directions)

    this.setState((state) => ({
      ...state, isEditing: false
    }))
  }

  handleEditExit = () => {
    this.setState((state) => ({
      ...state, isEditing: false
    }))
  }

  handleDeleteWaypointInEdit = () => {
    // get current index
    // delete
    this.setState(({carouselIndex}) => ({ removingIndex: carouselIndex }))

    Animated.spring(this.removingOpacity, {
      toValue: 1
    }).start(() => {
      this.removingOpacity.setValue(0)
      let { waypointsInEdit = [], carouselIndex } = this.state
      waypointsInEdit.splice(carouselIndex, 1)
      // this._carousel.snapToItem(carouselIndex + 1)
      this.setState({ waypointsInEdit })
    })
  }

  handleCarouselSelection = (index = 0) => {
    this.setState({ carouselIndex: index })
  }

  handleCarouselSelectionChange = (directionId) => {
    // find the index of directions
    const items = _.get(this._carousel, ['props', 'data'], [])
    const index = _.findIndex(items, {id: directionId})
    this._carousel.snapToItem(index)
  }

  handleEditDirection = (directionId, data) => {
    const { editDirection } = this.props
    editDirection(directionId, data)
  }

  handleAddEmptyDirectionRef = (refDirectionId) => {
    const { addEmptyDirection } = this.props
    console.log(refDirectionId)
    addEmptyDirection(refDirectionId)
  }

  handleRemoveDirection = () => {
    // find the current directionid
    const index = this._carousel.currentIndex
    const { directions = [] } = this.props
    const { id } = _.get(directions, index, {})

    // const directionId = '1'
    const { removeDirection } = this.props
    removeDirection(id)
  }

  renderItem = ({item = {}, index}) => {
    // const { text, textFlipped, image, flipped, saved, type } = item
    const { _ref, type, id: directionId, from: { name, location = {}, mapThumbnailUrl } = {}, text, imageUrl } = item
    const { isEditing = false, carouselIndex, removingIndex } = this.state

    if (type === 'create') {
      return (
        <DirectionPlaceholder onAdd={() => this.handleAddEmptyDirectionRef(_ref)} />
      )
    }

    const opacity = this.removingOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    return (
      <Animated.View style={[styles.directionItemContainer, { opacity: removingIndex === index ? opacity : 1 }]}>
        <DirectionDetail
          imageUrl={imageUrl}
          mapThumbnailUrl={mapThumbnailUrl}
          name={name}
          text={text}
          location={location}
          enterEdit={() => this.enterEditMode()}
          openCurrentMap={() => this.handleOpenMap(location)}
          isCurrent={carouselIndex === index}
          isEditing={isEditing}
          onEdit={(data) => this.handleEditDirection(directionId, data)}
        />
      </Animated.View>
    )
  }

  render () {
    const { width: viewportWidth } = Dimensions.get('window')
    const { firstItem = 0, directions = [], navigation } = this.props
    const { mapLocation = {}, isEditing = false, carouselIndex } = this.state

    let carouselItems = []
    if (isEditing) {
      let _skipPrev = true
      let _prevDirectionId = null
      carouselItems = _.flatMap(directions, (direction, index) => {
        let ret = [direction]
        if (index === 0) {
          _skipPrev = false
          _prevDirectionId = direction.id
        } else if (index === directions.length - 1) {
          if (!_skipPrev) {
            ret = [
              {type: 'create', '_ref': _prevDirectionId},
              ...ret
            ]
          }
        } else if (direction.imageUrl) {
          // picture is taken
          if (!_skipPrev) {
            ret = [
              {type: 'create', '_ref': _prevDirectionId},
              ...ret
            ]
          }
          _prevDirectionId = direction.id
          _skipPrev = false
        } else {
          _prevDirectionId = direction.id
          _skipPrev = true
        }
        return ret
      })

      // make sure there are at least two directions
      while (carouselItems.length < 2) {
        carouselItems.push({ type: 'create' })
      }
    } else {
      carouselItems = directions
    }

    return (
      <View style={styles.container}>
        <View style={styles.waypointsContainer}>
          <RouteView
            currentDirectionIndex={carouselIndex}
            directions={directions}
            isEditing={isEditing}
            onAddEmptyDirectionAt={index => this.handleAddEmptyDirectionAt(index)}
            onRemoveDirection={directionId => this.handleRemoveDirection(directionId)}
            onSelectDirection={this.handleCarouselSelectionChange}
          />
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={styles.headerRightButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name='md-close' size={Metrics.iconSize} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.directionContainer}>
          <Carousel
            ref={carousel => { this._carousel = carousel }}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            slideStyle={[{width: viewportWidth}, styles.slideItem]}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            firstItem={firstItem}
            data={carouselItems}
            renderItem={this.renderItem}
            // enableMomentum
            enableMomentum={false}
            decelerateionRate={'fast'}
            onSnapToItem={this.handleCarouselSelection}
            keyExtractor={(item, index) => item.id ? item.id : index}
          />
        </View>
        <MapPopup
          style={styles.popupView}
          location={mapLocation}
          ref={ref => { this.mapView = ref }}
          onDimissed={this.handleCloseMap}
        />
        { !!isEditing && (
          <View style={styles.buttonContainer}>
            <RoundedButton onPress={this.handleEditSaveAndExit}>저장</RoundedButton>
            <RoundedButton onPress={this.handleEditExit}>취소</RoundedButton>
            <RoundedButton onPress={this.handleRemoveDirection}>삭제</RoundedButton>
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { current, direction, waypoint } = state
  const { directions = [] } = current
  return {
    directions: _.map(directions, ({id: directionId}) => {
      if (directionId) {
        const {
          from: fromWaypointId,
          to: toWaypointId,
          text,
          imageUrl
        } = _.get(direction, directionId, {})

        return {
          id: directionId,
          from: _.pick(_.get(waypoint, fromWaypointId, {}), ['location', 'name', 'mapThumbnailUrl', 'type']),
          to: _.pick(_.get(waypoint, toWaypointId, {}), ['location', 'name', 'mapThumbnailUrl', 'type']),
          text,
          imageUrl
        }
      }
      return {}
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPave: (paveId) => dispatch(PaveActions.getPaveRequest(paveId)),
    getDirection: (directionId) => dispatch(DirectionActions.getDirectionRequest(directionId)),
    saveDirection: (directionId) => dispatch(DirectionActions.saveDirectionRequest(directionId)),
    editDirection: (directionId, data) => dispatch(DirectionActions.editDirectionRequest(directionId, data)),
    addEmptyDirection: (ref) => dispatch(CurrentActions.addEmptyDirection(ref)),
    removeDirection: (directionId) => dispatch(CurrentActions.removeDirection(directionId)),
    saveRoute: (directions) => dispatch(CurrentActions.saveRoute(directions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationScreen)

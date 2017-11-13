import _ from 'lodash'
import React from 'react'
import { Dimensions, View, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel'
import { Ionicons } from '@expo/vector-icons'

import RoundedButton from '../Components/RoundedButton'
import MapPopup from '../Components/MapPopup'
import Waypoints from '../Components/Waypoints'
import WaypointsEdit from '../Components/WaypointsEdit'
import DirectionDetail from '../Components/DirectionDetail'
import DirectionDetailEdit from './DirectionDetailEdit'

// Actions
import DirectionActions from '../Redux/DirectionRedux'
import WaypointActions from '../Redux/WaypointRedux'

import { Metrics } from '../Themes'
import styles from './Styles/DirectionScreenStyle'

class DirectionScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({ header: null })
  state = {
    mapLocation: {},
    waypointsInEdit: [],
    removingIndex: -1
  }

  constructor (props) {
    super(props)
    this.removingOpacity = new Animated.Value(0)
  }

  componentDidMount () {
    const { getDirection, directionId } = this.props
    getDirection(directionId)
  }

  openMap = (location) => {
    console.log('open', location)
    this.setState({ mapLocation: location }, () => {
      this.mapView.popupDialog.show()
    })
  }

  handleEditSaveAndExit = () => {
    const { waypointsInEdit = [] } = this.state
    const { updateWaypoints } = this.props

    // update to this waypoints
    updateWaypoints(waypointsInEdit)

    this.setState((state) => ({
      ...state, isEditing: false
    }))
  }

  handleEditExit = () => {
    this.setState((state) => ({
      ...state, isEditing: false
    }))
  }

  handleAddWaypointInEdit = (index) => {
    let { waypointsInEdit = [] } = this.state
    waypointsInEdit.splice(index, 0, { isNew: true })
    this.setState({ waypointsInEdit }, () => {
      this._carousel.snapToItem(index)
    })
    console.log(waypointsInEdit)
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

  renderItem = ({item = {}, index}) => {
    // const { text, textFlipped, image, flipped, saved, type } = item
    const { id, image, mapThumbnail, text, location = {}, isNew = false } = item
    const { carouselIndex = 0, removingIndex } = this.state

    const opacity = this.removingOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    return (
      <Animated.View style={[styles.directionItemContainer, { opacity: removingIndex === index ? opacity : 1 }]}>
        {isEditing ? (
          <DirectionDetailEdit
            waypointId={id}
            image={image}
            text={text}
            isNew={isNew}
            isCurrent={carouselIndex === index}
          />
        ) : (
          <DirectionDetail
            image={image}
            mapThumbnail={mapThumbnail}
            text={text}
            location={location}
            enterEdit={() => this.enterEditMode()}
            openCurrentMap={() => this.openMap(location)}
            isCurrent={carouselIndex === index}
          />
        )}
      </Animated.View>
    )
  }

  render () {
    const { width: viewportWidth } = Dimensions.get('window')
    const { firstItem = 0, waypoints = [] } = this.props
    const { mapLocation = {}, isEditing = false, waypointsInEdit = [] } = this.state
console.log(waypointsInEdit)
    return (
      <View style={styles.container}>
        <View style={styles.waypointsContainer}>
          { isEditing ? (
            <WaypointsEdit
              from={'홍대입구역 8번 출구'}
              to={'나눔카 존 1'}
              items={waypointsInEdit}
              addWaypoint={this.handleAddWaypointInEdit}
            />
          ) : ([
            <Waypoints
              key={0}
              items={waypoints}
              from={'홍대입구역 8번 출구'}
              to={'나눔카 존 1'}
            />,
            <View key={1} style={styles.closeButtonContainer}>
              <TouchableOpacity
                style={styles.headerRightButton}
              >
                <Ionicons name='md-close' size={Metrics.iconSize} />
              </TouchableOpacity>
            </View>
          ])}
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
            data={isEditing ? waypointsInEdit : waypoints}
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
          // ref={ref => { this.mapView = ref && ref.getWrappedInstance() }}
          ref={ref => { this.mapView = ref }}
        />
        { isEditing && (
          <View style={styles.buttonContainer}>
            <RoundedButton onPress={this.handleEditSaveAndExit}>저장</RoundedButton>
            <RoundedButton onPress={this.handleEditExit}>취소</RoundedButton>
            <RoundedButton onPress={this.handleDeleteWaypointInEdit}>삭제</RoundedButton>
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { direction, waypoint } = state
  const { waypoints = [] } = _.get(direction, ['test1'], {})
  return {
    directionId: 'test1',
    waypoints: _.map(waypoints, waypointId => _.has(waypoint, waypointId) ? waypoint[waypointId] : {})
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDirection: (directionId) => dispatch(DirectionActions.getDirectionRequest(directionId)),
    addEmptyWaypoint: (directionId, index) => dispatch(DirectionActions.addEmptyWaypoint(directionId, index)),
    updateWaypoints: (directionId, waypoints) => dispatch(DirectionActions.updateWaypointsRequest(directionId, waypoints))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionScreen)

import _ from 'lodash'
import React from 'react'
import { Dimensions, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel'
import { Ionicons } from '@expo/vector-icons'

import MapPopup from '../Components/MapPopup'
import Waypoints from '../Components/Waypoints'
import DirectionDetail from '../Components/DirectionDetail'

import { Metrics } from '../Themes'
import styles from './Styles/DirectionScreenStyle'

class DirectionScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({ header: null })
  state = {
    mapLocation: {},
    waypointsInEdit: [],
    removingIndex: -1
  }

  openMap = (location) => {
    console.log('open', location)
    this.setState({ mapLocation: location }, () => {
      this.mapView.popupDialog.show()
    })
  }

  handleCarouselSelection = (index = 0) => {
    this.setState({ carouselIndex: index })
  }

  renderItem = ({item = {}, index}) => {
    // const { text, textFlipped, image, flipped, saved, type } = item
    const { image, mapThumbnail, text, location = {} } = item
    const { carouselIndex = 0 } = this.state
    const { enterEditMode } = this.props

    return (
      <View style={styles.directionItemContainer}>
        <DirectionDetail
          image={image}
          mapThumbnail={mapThumbnail}
          text={text}
          location={location}
          enterEdit={enterEditMode}
          openCurrentMap={() => this.openMap(location)}
          isCurrent={carouselIndex === index}
        />
      </View>
    )
  }

  render () {
    const { width: viewportWidth } = Dimensions.get('window')
    const { firstItem = 0, waypoints = [] } = this.props
    const { mapLocation = {} } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.waypointsContainer}>
          <Waypoints
            key={0}
            items={waypoints}
            from={'홍대입구역 8번 출구'}
            to={'나눔카 존 1'}
          />
          <View key={1} style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={styles.headerRightButton}
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
            data={waypoints}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionScreen)

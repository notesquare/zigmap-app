import _ from 'lodash'
import React from 'react'
import { View, Animated, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import Immutable from 'seamless-immutable'

import Dash from 'react-native-dash'
import { Colors } from '../Themes'

import NavigationHeader from '../Components/NavigationHeader'
import NavigationFooter from '../Components/NavigationFooter'

import DirectionItem from '../Components/DirectionItem'
import DirectionPlaceholder from '../Components/DirectionPlaceholder'

// Actions
import DirectionActions from '../Redux/DirectionRedux'
import PaveActions from '../Redux/PaveRedux'
import CurrentActions from '../Redux/CurrentRedux'

import styles from './Styles/NavigationScreenStyle'

class NavigationScreen extends React.Component {
  state = {
    isEditing: false
  }

  constructor (props) {
    super(props)
    this.removingOpacity = new Animated.Value(0)
  }

  componentDidMount () {
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

  handleItemPress = (directionId, waypointId) => {
    const { openDirection } = this.props
    openDirection(directionId, waypointId)
  }

  renderItem = ({item = {}, index, section}) => {
    // const { text, textFlipped, image, flipped, saved, type } = item
    const { expandDirection } = this.props
    const {
      _ref,
      type,
      directionId,
      from: { id: waypointId, name, location = {}, mapThumbnailUrl } = {},
      text,
      imageUrl,
      time,
      traffic,
      detailDirections = [],
      points = []
    } = item
    const { isEditing = false, removingIndex } = this.state

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
      <Animated.View style={[styles.directionItemContainer, { opacity: removingIndex === index ? opacity : 1, paddingTop: index === 0 ? 10 : 0 }]}>
        <DirectionItem
          imageUrl={imageUrl}
          mapThumbnailUrl={mapThumbnailUrl}
          name={name}
          text={text}
          type={type}
          time={time}
          traffic={traffic}
          hideName={index === 0}
          location={location}
          directionPoints={points}
          noOfDetailDirections={detailDirections.length}
          enterEdit={() => this.enterEditMode()}
          openCurrentMap={() => this.handleOpenMap(location)}
          isEditing={isEditing}
          onExpand={() => expandDirection(index)}
          onEdit={(data) => this.handleEditDirection(directionId, data)}
          onPress={() => this.handleItemPress(directionId, waypointId)}
        />
      </Animated.View>
    )
  }

  renderSectionHeader = (data) => {
    if (_.get(data, ['section', 'type']) === 'nanumcar') {
      return (
        <View style={styles.sectionHeader}>
          <View style={styles.sectionContainer}>
            <Feather name='chevron-right' style={styles.sectionIcon} />
            {/* <Text style={styles.sectionText}>예약정보</Text> */}
          </View>
        </View>
      )
    }
    return null
  }

  render () {
    const { from, to, directions = [], navigation } = this.props

    return (
      <View style={styles.container}>
        <NavigationHeader navigation={navigation} title={from} />
        <View style={styles.mainContainer}>
          <View style={styles.timelineContainer}>
            <Dash
              style={styles.timeline}
              dashThickness={5}
              dashLength={4}
              dashGap={0}
              dashColor={Colors.point1}
            />
          </View>
          <FlatList style={styles.mainContainer}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            renderItem={this.renderItem}
            data={directions}
            // renderSectionHeader={this.renderSectionHeader}
            // sections={directions}
            keyExtractor={(item, index) => index}
          />
        </View>
        <NavigationFooter title={to} />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { current, direction, waypoint } = state
  const { directions: currentDirections = [] } = current

  let directions = _.map(currentDirections, data => {
    data = Immutable.asMutable(data)
    // 2. expand direction
    const { directionId } = data
    if (directionId) {
      const directionData = _.get(direction, directionId, {})
      data = {
        ...data,
        directionId,
        ..._.pick(directionData, ['text', 'time', 'type', 'imageUrl', 'points'])
      }
      if (directionData.from) {
        data.from = {
          id: directionData.from
        }
      }
      if (directionData.to) {
        data.to = {
          id: directionData.to
        }
      }
    }

    // 1. expand waypoint ids
    if (_.has(data, ['from', 'id'])) {
      data.from = {
        id: data.from.id,
        ..._.pick(_.get(waypoint, data.from.id, {}),
                  ['location', 'name', 'mapThumbnailUrl', 'type'])
      }
    }
    if (_.has(data, ['to', 'id'])) {
      data.to = {
        id: data.to.id,
        ..._.pick(_.get(waypoint, data.to.id, {}),
                  ['location', 'name', 'mapThumbnailUrl', 'type', 'imageUrl'])
      }
    }

    return _.pick(data, ['directionId', 'from', 'to', 'text', 'imageUrl', 'type', 'time', 'detailDirections', 'traffic', 'points'])
  })

  const fromName = _.chain(directions).first().get(['from', 'name']).value()
  const toName = _.chain(directions).last().get(['to', 'name']).value()

  return {
    from: fromName,
    to: toName,
    directions: directions
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
    saveRoute: (directions) => dispatch(CurrentActions.saveRoute(directions)),
    openDirection: (directionId, waypointId) => dispatch(CurrentActions.openDirection(directionId, waypointId)),
    expandDirection: (index) => dispatch(CurrentActions.expandDirection(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationScreen)

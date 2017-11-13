import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'

import styles from './Styles/RouteViewStyle'
import WaypointBox from './WaypointBox'

// given directions, show summary view of directions

export default class RouteView extends React.Component {
  static propTypes = {
    currentDirectionIndex: PropTypes.number,
    directions: PropTypes.array,
    isEditing: PropTypes.bool,
    onAddEmptyDirectionAt: PropTypes.func,
    onRemoveDirection: PropTypes.func,
    onSelectDirection: PropTypes.func
  }

  handleAdd = (index) => {
    const { onAddEmptyDirectionAt } = this.props
    onAddEmptyDirectionAt(index)
  }

  handleRemove = (directionId) => {
    const { onRemoveDirection } = this.props
    onRemoveDirection(directionId)
  }

  renderDirection = (direction = {}, index, last = false) => {
    const { id, from, imageUrl } = direction
    const { onSelectDirection, currentDirectionIndex = -1 } = this.props

    return (
      <TouchableOpacity style={styles.waypointContainer} key={index} onPress={() => onSelectDirection(id)}>
        <WaypointBox
          name={from.name}
          imageUrl={imageUrl}
          selected={currentDirectionIndex === index}
        />
        { !last && (
          <Text> -> </Text>
        )}
      </TouchableOpacity>
    )
  }

  renderDirectionEditing = (direction = {}, index, last = false) => {
    const { id, from, imageUrl } = direction
    const { onSelectDirection, currentDirectionIndex = -1 } = this.props

    return (
      <TouchableOpacity style={styles.waypointContainer} key={index} onPress={() => onSelectDirection(id)}>
        <WaypointBox
          name={from.name}
          imageUrl={imageUrl}
          selected={currentDirectionIndex === index}
        />
        { !last && ([
          <Text key='text0'> - </Text>,
          <View key='view0' style={styles.addBox}>
            <TouchableOpacity
              style={styles.addBoxButton}
              onPress={() => this.handleAdd(index + 1)}
            >
              <Text> + </Text>
            </TouchableOpacity>
          </View>,
          <Text key='text1'> -> </Text>
        ])}
      </TouchableOpacity>
    )
  }

  render () {
    const { directions = [], isEditing } = this.props
    let elements = []
    // if (isEditing) {
    //   elements = _.map(directions, (direction, index) =>
    //     this.renderDirectionEditing(direction, index, index === directions.length - 1)
    //   )
    // } else {
    //   elements = _.map(directions, (direction, index) =>
    //     this.renderDirection(direction, index, index === directions.length - 1)
    //   )
    // }
    elements = _.map(directions, (direction, index) =>
      this.renderDirection(direction, index, index === directions.length - 1)
    )
    return (
      <ScrollView horizontal style={styles.container} contentContainerStyle={styles.content}>
        {elements}
      </ScrollView>
    )
  }
}

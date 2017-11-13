import _ from 'lodash'
import React from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'

import WaypointBox from './WaypointBox'
import styles from './Styles/WaypointsStyles'

export default class Waypoints extends React.Component {
  handleAdd = (index) => {
    const { addWaypoint } = this.props
    addWaypoint(index)
  }

  render () {
    const { from, to, items = [] } = this.props
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <View style={styles.box} key={-1}>
            <Text>{from}</Text>
          </View>
          <View style={styles.addBox}>
            <TouchableOpacity
              style={styles.addBoxButton}
              onPress={() => this.handleAdd(0)}
            >
              <Text> + </Text>
            </TouchableOpacity>
          </View>
          {_.map(items, ({image}, index) => ([
            <View style={styles.box} key={index}>
              <WaypointBox image={image} />
            </View>,
            <View style={styles.addBox}>
              <TouchableOpacity
                style={styles.addBoxButton}
                onPress={() => this.handleAdd(index + 1)}
              >
                <Text> + </Text>
              </TouchableOpacity>
            </View>
          ]))}
          <View style={styles.box} key={-2}>
            <Text>{to}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

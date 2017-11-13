import _ from 'lodash'
import React from 'react'
import { Text, View, ScrollView } from 'react-native'

import WaypointBox from './WaypointBox'
import styles from './Styles/WaypointsStyles'

export default class Waypoints extends React.Component {
  render () {
    const { from, to, items = [] } = this.props
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <View style={styles.box} key={-1}>
            <Text>{from}</Text>
            <Text> -> </Text>
          </View>
          {_.map(items, ({image}, index) => (
            <View style={styles.box} key={index}>
              <WaypointBox image={image} />
              <Text> -> </Text>
            </View>
          ))}
          <View style={styles.box} key={-2}>
            <Text>{to}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

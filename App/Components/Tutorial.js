import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/TutorialStyles'

export default class Tutorial extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.shapeContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>공부 시작</Text>
          </View>
          <View style={styles.arrow}>
            <View style={styles.triangle} />
            <View style={styles.body} />
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

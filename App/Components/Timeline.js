import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TimelineStyles'

export default class Timeline extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    prevType: PropTypes.string,
    time: PropTypes.number,
    showDot: PropTypes.bool
  }

  render () {
    const { showDot = true } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          {!!showDot && (
            <Text style={styles.dot}>&#9679;</Text>
          )}
        </View>
        <View style={styles.right} />
        {/* <View style={styles.methodContainer}>
          {!!type && ([
            <Text style={styles.text}>{methodName}</Text>,
            <Text style={styles.text}>{time} 분</Text>
          ])}
        </View> */}
      </View>
    )
  }
}

import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/NavigationFooterStyles'
import { Feather } from '@expo/vector-icons'

export default class NavigationFooter extends React.Component {
  static propTypes = {
    title: PropTypes.string
  }

  render () {
    const { title } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.timelineContainer}>
          <Feather name='map-pin' style={styles.pointIcon} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }
}

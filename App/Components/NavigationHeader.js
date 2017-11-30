import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Feather } from '@expo/vector-icons'
import styles from './Styles/NavigationHeaderStyles'

export default class NavigationHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    navigation: PropTypes.object
  }

  handleBackButton = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render () {
    const { title } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.timelineContainer}>
          <Feather name='disc' style={styles.pointIcon} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.stub} />
        <TouchableOpacity onPress={this.handleBackButton} style={styles.closeButtonContainer}>
          <Feather name='x' style={styles.closeButton} />
        </TouchableOpacity>
      </View>
    )
  }
}

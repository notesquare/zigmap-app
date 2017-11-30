import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import styles from './Styles/DirectionHeaderStyles'

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
        <TouchableOpacity onPress={this.handleBackButton} style={styles.backButtonContainer}>
          <Ionicons name='ios-arrow-back' style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    )
  }
}

import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { DangerZone } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { Metrics } from '../Themes/'
import styles from './Styles/DirectionHeaderStyles'

const { GestureHandler } = DangerZone
const { TapGestureHandler, State } = GestureHandler

export default class DirectionHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    onDoubleTap: PropTypes.func
  }

  handleDClick = (event) => {
    if (event.nativeEvent.state !== State.ACTIVE) return
    const { onDoubleTap } = this.props
    if (onDoubleTap) {
      onDoubleTap()
    }
  }

  render () {
    const { title, onClose } = this.props
    return (
      <View style={styles.header}>
        {/* <StatusBar hidden /> */}
        <View style={styles.headerContent}>
          <TapGestureHandler
            onHandlerStateChange={this.handleDClick}
            numberOfTaps={2}
          >
            <Text style={styles.headerText}>
              { title }
            </Text>
          </TapGestureHandler>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerRightButton}
              onPress={onClose}
            >
              <Ionicons name='md-close' size={Metrics.iconSize} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

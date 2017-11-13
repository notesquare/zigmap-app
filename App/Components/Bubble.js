import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/BubbleStyles'

export default class Bubble extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string
  }

  render () {
    const { backgroundColor, color, text } = this.props
    return (
      <View style={[styles.container, backgroundColor ? {backgroundColor} : {}]}>
        {text && (
          <Text style={[styles.text, color ? {color} : {}]}>
            {text}
          </Text>
        )}
        { this.props.children }
      </View>
    )
  }
}

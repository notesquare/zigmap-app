import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/SelectButtonStyles'

import { Colors } from '../Themes/'

export default class SelectButton extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    styles: PropTypes.object
  }

  state = {
    isSelected: false
  }

  handlePress = () => {
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render () {
    const { isSelected } = this.state
    let style = {}
    let textStyle = {}
    if (isSelected) {
      style = {
        backgroundColor: Colors.selectButtonSelected
      }
      textStyle = {
        color: '#ffffff'
      }
    }

    return (
      <TouchableOpacity
        style={[styles.button, style, this.props.styles]}
        onPress={this.handlePress}
      >
        <Text style={[styles.buttonText, textStyle]}>
          {this.props.text && this.props.text.toUpperCase()}
        </Text>
      </TouchableOpacity>
    )
  }
}

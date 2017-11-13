import _ from 'lodash'
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/RoundedButtonStyles'

export default class RoundedButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  constructor (props) {
    super(props)

    // debounces
    this.handlePress = _.debounce(this.handlePress, 1000, {leading: true, trailing: false})
  }

  handlePress = () => {
    this.props.onPress()
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    return (
      <TouchableOpacity style={styles.button} onPress={this.handlePress}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}

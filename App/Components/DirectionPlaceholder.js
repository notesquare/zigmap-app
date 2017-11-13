import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

import styles from './Styles/DirectionPlaceholder'

export default class DirectionPlaceholder extends React.Component {
  static propTypes = {
    onAdd: PropTypes.func
  }

  handleAddPress = () => {
    const { onAdd } = this.props
    onAdd()
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleAddPress()}>
          <SimpleLineIcons name='plus' size={40} />
        </TouchableOpacity>
      </View>
    )
  }
}

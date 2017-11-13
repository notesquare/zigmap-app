import React from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from './Styles/WaypointBoxStyles'

export default class WaypointBox extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    selected: PropTypes.bool
  }

  render () {
    const { name, imageUrl, selected = false } = this.props

    return (
      <View style={[styles.container, selected && styles.selected]}>
        { imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.image} />
        ) : (
          <Text style={styles.text}>{name}</Text>
        )}
      </View>
    )
  }
}

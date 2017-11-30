import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import TravelModeIcon from './TravelModeIcon'
import styles from './Styles/SearchResultItemStyles'

export default class SearchResultItem extends React.Component {
  static propTypes = {
    totalTime: PropTypes.number,
    type: PropTypes.string,
    price: PropTypes.string,
    onPress: PropTypes.func,
    methods: PropTypes.array,
    co2: PropTypes.string
  }

  renderMethod = (method = {}, index) => {
    const { type, time } = method
    return (
      <View style={styles.methodContainer} key={index}>
        <TravelModeIcon style={styles.modeIcon} mode={type} />
        <Text style={styles.modeTimeText}>{time} 분</Text>
      </View>
    )
  }

  render () {
    const { type, totalTime, price, methods = [], onPress, co2 } = this.props

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.totalTimeText}>{totalTime} 분</Text>
            <Feather name='chevron-right' style={styles.icon} />
          </View>
        </View>
        <View style={styles.mainContainer}>
          {_.map(methods, this.renderMethod)}
          {!!price && (
            <View style={styles.methodContainer}>
              <Text style={styles.modeTimeText}>&#8361; {price}</Text>
            </View>
          )}
          {!!co2 && (
            <View style={styles.methodContainer}>
              <Text style={styles.modeTimeText}>{co2} kgCO&#8322;</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

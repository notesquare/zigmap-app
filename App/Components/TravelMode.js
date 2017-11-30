import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Feather } from '@expo/vector-icons'
import Dash from 'react-native-dash'

import styles from './Styles/TravelModeStyles'
import { Images, Colors } from '../Themes'

export default class TravelMode extends React.Component {
  static propTypes = {
    mode: PropTypes.string,
    time: PropTypes.number,
    traffic: PropTypes.number,
    noOfDetailDirections: PropTypes.number,
    onPressMore: PropTypes.func
  }

  render () {
    const { time, mode, noOfDetailDirections = 0, traffic, onPressMore } = this.props

    let modeImage = Images.walk
    let trafficStatus = ''
    if (mode && mode.startsWith('subway')) {
      modeImage = Images.subway
    } else if (mode === 'nanumcar') {
      modeImage = Images.nanumcar
      if (traffic > 80) {
        trafficStatus = '극심한 정체'
      } else if (traffic > 50) {
        trafficStatus = '정체'
      } else {
        trafficStatus = '교통 흐름 원활'
      }
    }

    return (
      <View style={styles.container}>
        <Dash
          style={styles.dotDotDot}
          dashThickness={5}
          dashLength={4}
          dashGap={0}
          dashColor={Colors.point1}
        />
        <View style={styles.mainContainer}>
          {!!modeImage && (
            <View style={styles.circle}>
              <Image style={styles.modeIcon} source={modeImage} />
            </View>
          )}
          <View style={styles.tagContainer}>
            {mode === 'subway-transfer' && (
              <Text style={styles.text}>환승 </Text>
            )}
            {!!time && (
              <Text style={styles.text}>{time} 분</Text>
            )}
            {!!trafficStatus && (
              <Text style={styles.trafficStatusText}>{trafficStatus}</Text>
            )}
          </View>
        </View>
        {noOfDetailDirections > 0 && (
          <TouchableOpacity style={styles.buttonContainer} onPress={onPressMore}>
            <Feather name='chevron-down' style={styles.showMoreIcon} />
            <Text style={styles.showMoreButtonText}>
              상세 길 안내 펼치기
              <Text style={styles.showMoreButtonText}>
                ({noOfDetailDirections})
              </Text>
            </Text>
            <Dash
              style={styles.innerDotDotDot}
              dashThickness={5}
              dashLength={5}
              dashGap={3}
              dashColor={Colors.point1}
            />
          </TouchableOpacity>
        )}
        <Dash style={styles.dotDotDot}
          dashThickness={5}
          dashLength={4}
          dashGap={0}
          dashColor={Colors.point1}
        />
      </View>
    )
  }
}

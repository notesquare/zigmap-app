import React from 'react'
import { View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Images } from '../Themes'

export default class TravelModeIcon extends React.Component {
  static propTypes = {
    mode: PropTypes.string
  }

  render () {
    const { mode, style } = this.props

    let modeImage
    if (mode === 'subway-transfer') {
      modeImage = Images.walk
    } else if (mode && mode.startsWith('subway')) {
      modeImage = Images.subway
    } else if (mode && mode.startsWith('walk')) {
      modeImage = Images.walk
    } else if (mode === 'nanumcar') {
      modeImage = Images.nanumcar
    } else if (mode === 'bus') {
      modeImage = Images.bus
    } else if (mode === 'seoulbike') {
      modeImage = Images.seoulbike
    }

    if (!modeImage) {
      return <View style={style} />
    }

    return (
      <View style={style}>
        <Image style={{width: '100%', height: '100%'}} source={modeImage} />
      </View>
    )
  }
}

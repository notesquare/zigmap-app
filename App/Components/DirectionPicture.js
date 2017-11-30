import React from 'react'
import { View, Image } from 'react-native'
import PropTypes from 'prop-types'

import DrawableView from '../Components/DrawableView'
import styles from './Styles/DirectionPictureStyles'

export default class DirectionPicture extends React.Component {
  static propTypes = {
    source: PropTypes.object,
    editable: PropTypes.bool,
    points: PropTypes.array
  }

  render () {
    const { source, editable = false, points = [] } = this.props
    // const source = {uri: 'https://firebasestorage.googleapis.com/v0/b/opendirection-1508138057112.appspot.com/o/pictures%2Ftest3.jpg?alt=media'}
    return (
      <View style={[this.props.style, styles.container]}>
        <Image source={source} style={styles.image} resizeMode='contain' />
        <DrawableView
          ref={ref => { this.ref = ref }}
          style={styles.drawableView}
          editable={editable}
          points={points}
        />
      </View>
    )
  }
}

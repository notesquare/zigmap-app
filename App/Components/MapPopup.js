import _ from 'lodash'
import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { MapView } from 'expo'
import PopupDialog from 'react-native-popup-dialog'

import styles from './Styles/MapPopupStyles'

const LATITUDE_DELTA = 0.002
const LONGITUDE_DELTA = LATITUDE_DELTA

export default class MapPopup extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    location: PropTypes.object
  }

  render () {
    const { location = {}, style = {} } = this.props
    let region = null
    if (!_.isEmpty(location)) {
      region = {
        ...location, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA
      }
    }

    return (
      <PopupDialog
        ref={ref => { this.popupDialog = ref }}
        dialogStyle={style}
        actions={[]}
      >
        {!_.isEmpty(location) && (
          <MapView
            provider={MapView.PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation
            scrollEnabled
            region={region}
          >
            {location && location.latitude && (
              <MapView.Marker
                coordinate={location}
              />
            )}
          </MapView>
        )}
      </PopupDialog>
    )
  }
}

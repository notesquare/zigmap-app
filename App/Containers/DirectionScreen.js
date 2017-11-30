import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity, Linking, Platform } from 'react-native'
import { Camera, Location, Permissions, MapView } from 'expo'
import { SimpleLineIcons, Feather } from '@expo/vector-icons'

// Actions
import CurrentActions from '../Redux/CurrentRedux'
import DirectionActions from '../Redux/DirectionRedux'

import DirectionPicture from '../Components/DirectionPicture'
import DirectionHeader from '../Components/DirectionHeader'
import RoundedButton from '../Components/RoundedButton'
import styles from './Styles/DirectionScreenStyles'

class DirectionScreen extends React.Component {
  static propTypes = {
    directionId: PropTypes.string
  }

  state = {
    hasCameraPermission: null,
    isCameraShooting: false,
    isMapView: false,
    edited: false,
    image: null,
    directionId: null,
    isEditing: false
  }

  componentDidMount () {
    if (!this.props.imageUrl) {
      this.setState({
        isMapView: true
      })
    }
  }

  async enterCameraMode () {
    // 1. get location Permissions
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      // show warning message
    }

    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: cameraStatus === 'granted', isCameraShooting: true })
    console.info('camera permission: ', cameraStatus)
  }

  async takePicture () {
    if (this.camera) {
      const { onEdit } = this.props
      const { uri: imageUrl } = await this.camera.takePictureAsync()
      this.setState({
        isCameraShooting: false,
        image: imageUrl,
        edited: true
      })

      const { coords: { latitude, longitude, accuracy }, timestamp } = await Location.getCurrentPositionAsync({})
      this.setState({
        location: {
          latitude, longitude
        }
      })

      onEdit({ imageUrl, location: { latitude, longitude, accuracy }, timestamp })
      //   FileSystem.moveAsync({
      //     from: data,
      //     to: `${FileSystem.documentDirectory}photos/Photo_${this.state
      //       .photoId}.jpg`,
      //   }).then(() => {
      //     this.setState({
      //       photoId: this.state.photoId + 1,
      //     });
      //     Vibration.vibrate();
      //   });
    }
  }

  cancelTakePicture () {
    this.setState({ isCameraShooting: false })
  }

  handleEditButton = () => {
    this.setState({ isEditing: true })
  }

  handleMapPress = () => {
    this.setState({isMapView: !this.state.isMapView})
  }

  handleCancel = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  handleSave = () => {
    const { directionId, saveDirectionPoints, navigation } = this.props
    const points = _.get(this.directionPicture, ['ref', 'points'], [])
    if (directionId) {
      saveDirectionPoints(directionId, points)
    }
    navigation.goBack()
  }

  renderInEdit = () => {
    const { name, imageUrl, tags = [], points } = this.props
    const { image: cameraImage, isCameraShooting, hasCameraPermission } = this.state
    return (
      <View style={styles.container}>
        { hasCameraPermission && isCameraShooting ? (
          <View style={styles.primaryContainer}>
            <Camera
              ref={ref => (this.camera = ref)}
              style={styles.camera}
              type={Camera.Constants.Type.back}
            >
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelSnapButton}
                  onPress={() => this.cancelTakePicture()}
                >
                  <Text>취소</Text>
                </TouchableOpacity>
                <RoundedButton
                  style={styles.snapButton}
                  onPress={() => this.takePicture()}
                >
                  Snap
                </RoundedButton>
                <View style={styles.stub} />
              </View>
            </Camera>
          </View>
        ) : [
          <View key={0} style={styles.primaryContainer}>
            {(!!cameraImage || !!imageUrl) && (
              <DirectionPicture
                source={{uri: cameraImage || imageUrl}}
                style={styles.image}
                ref={ref => { this.directionPicture = ref }}
                editable
                points={points}
              />
            )}
          </View>,
          <View key={'buttons'} style={styles.imageButtonContainer}>
            <RoundedButton onPress={() => this.enterCameraMode()}>
              {imageUrl ? '사진 다시 찍기' : '사진 찍기'}
            </RoundedButton>
          </View>
        ]}
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.textContainer}>
          {/* <TextInput editable multiline style={styles.instructionText}>{text}</TextInput> */}
          <View style={styles.tagContainer}>
            {_.map(tags, this.renderTag)}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <RoundedButton style={styles.cancelButton} onPress={() => this.handleCancel()}>
           취소
          </RoundedButton>
          <RoundedButton style={styles.saveButton} onPress={() => this.handleSave()}>
            저장하기
          </RoundedButton>
        </View>
      </View>
    )
  }

  renderPicture = () => {
    const { imageUrl, points } = this.props
    if (imageUrl) {
      return (
        <DirectionPicture
          source={{uri: imageUrl}}
          style={styles.image}
          points={points}
        />
      )
    }
    return (
      <View style={styles.emptyImageContainer}>
        <SimpleLineIcons name='camera' size={40} style={{backgroundColor: 'transparent'}} />
      </View>
    )
  }

  renderMapView = () => {
    const { mapThumbnailUrl, location } = this.props
    const { isMapView } = this.state
    if (isMapView && !_.isEmpty(location)) {
      // get mapView
      const LATITUDE_DELTA = 0.002
      const LONGITUDE_DELTA = LATITUDE_DELTA
      const region = {
        ...location, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA
      }
      return (
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
      )
    }

    // get map image
    if (mapThumbnailUrl) {
      return (
        <Image
          source={{uri: mapThumbnailUrl}}
          style={styles.mapThumbnail}
          resizeMode={'contain'}
        />
      )
    }

    return (
      <View style={styles.mapThumbnailContainer}>
        <Feather name='map-pin' style={styles.mapIcon} />
      </View>
    )
  }

  renderTag = (tag, index) => {
    return (
      <Text key={index} style={styles.tagText}>#{tag}</Text>
    )
  }

  openExternalApp = () => {
    // https://www.appsight.io/app/socar
    const appStoreId = 'id515173864'
    const playStoreId = 'socar.Socar'

    Linking.openURL('socar://').catch(() => {
      if (Platform.OS === 'ios') {
        Linking.openURL(`https://itunes.apple.com/ko/app/${appStoreId}`)
      } else {
        Linking.openURL(`https://play.google.com/store/apps/details?id=${playStoreId}`)
      }
    })
  }

  renderFunctions = (type) => {
    if (type === 'nanumcar') {
      return (
        <View style={styles.buttons}>
          <RoundedButton
            text='예약가능 차량 확인'
            onPress={this.openExternalApp}
          />
          <RoundedButton
            text='나눔카 예약하기 (쏘카)'
            onPress={this.openExternalApp}
          />
        </View>
      )
    }
    return null
  }

  render () {
    const { name, text, navigation, tags = [], type } = this.props
    const { isMapView, isEditing } = this.state
    if (isEditing) {
      return this.renderInEdit()
    }

    return (
      <View style={styles.container}>
        <DirectionHeader navigation={navigation} title={name} />
        <View style={styles.primaryContainer}>
          {isMapView ? this.renderMapView() : this.renderPicture()}
          <TouchableOpacity onPress={this.handleMapPress} style={styles.secondaryContainer}>
            {!isMapView ? this.renderMapView() : this.renderPicture()}
          </TouchableOpacity>
        </View>
        <View style={styles.instructionContainer}>
          <View style={styles.textContainer}>
            <View style={styles.tagContainer}>
              {_.map(tags, this.renderTag)}
            </View>
            <Text style={styles.instructionText}>{text}</Text>
            {!!type && this.renderFunctions(type)}
            <TouchableOpacity style={styles.editButtonContainer} onPress={this.handleEditButton}>
              <Text style={styles.editButton}>오류 수정 또는 내용 추가하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { current, direction, waypoint } = state
  const { directionId, waypointId } = current

  if (directionId) {
    const {
      from: fromWaypointId,
      // to: toWaypointId,
      text,
      imageUrl,
      points = []
    } = _.get(direction, directionId, {})

    const { name, mapThumbnailUrl, location, tags = [] } = _.get(waypoint, fromWaypointId, {})

    return {
      directionId,
      name,
      mapThumbnailUrl,
      text,
      location,
      imageUrl,
      tags,
      points
    }
  } else if (waypointId) {
    const {
      name,
      mapThumbnailUrl,
      tags = [],
      location,
      type
    } = _.get(waypoint, waypointId, {})

    return {
      name,
      mapThumbnailUrl,
      location,
      tags,
      type
    }
  }

  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    expandDirection: (index) => dispatch(CurrentActions.expandDirection(index)),
    saveDirectionPoints: (directionId, points) => dispatch(DirectionActions.saveDirectionPoints(directionId, points))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionScreen)

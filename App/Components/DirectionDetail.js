import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Camera, Location, Permissions } from 'expo'
import { SimpleLineIcons } from '@expo/vector-icons'

import RoundedButton from '../Components/RoundedButton'
import styles from './Styles/DirectionDetailStyles'

export default class DirectionDetail extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    mapThumbnailUrl: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    location: PropTypes.object,
    enterEdit: PropTypes.func,
    openCurrentMap: PropTypes.func,
    onEdit: PropTypes.func,
    isCurrent: PropTypes.bool,
    isEditing: PropTypes.bool
  }

  state = {
    hasCameraPermission: null,
    isCameraShooting: false,
    edited: false,
    image: null
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
    const { enterEdit } = this.props
    if (typeof enterEdit === 'function') enterEdit()
  }

  handleMapPress = () => {
    const { openCurrentMap } = this.props
    openCurrentMap()
    // this.setState({isMapView: !this.state.isMapView})
  }

  renderInEdit = () => {
    const { name, imageUrl, text } = this.props
    const { image: cameraImage, isCameraShooting, hasCameraPermission } = this.state
    return (
      <View style={styles.container}>
        { hasCameraPermission && isCameraShooting ? (
          <View style={styles.imageContainer}>
            <Camera
              ref={ref => (this.camera = ref)}
              style={styles.camera}
              type={Camera.Constants.Type.back}
            >
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
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
        ) : (
          <View style={styles.imageContainer}>
            {(!!cameraImage || !!imageUrl) && (
              <Image
                key={'image'}
                source={{uri: cameraImage || imageUrl}}
                style={styles.image}
                resizeMode={'contain'}
              />
            )}
            <View key={'buttons'} style={styles.imageButtonContainer}>
              <RoundedButton onPress={() => this.enterCameraMode()}>
                {imageUrl ? '다시 찍기' : '사진 찍기'}
              </RoundedButton>
            </View>
          </View>
        )}
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.textContainer}>
          {/* <TextInput editable multiline style={styles.instructionText}>{text}</TextInput> */}
          <Text style={styles.instructionText}>{text}</Text>
        </View>
      </View>
    )
  }

  render () {
    const { imageUrl, mapThumbnailUrl, name, text, isEditing } = this.props
    if (isEditing) {
      return this.renderInEdit()
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image
              source={{uri: imageUrl}}
              style={styles.image}
              resizeMode='contain'
            />
          ) : (
            <View style={styles.emptyImageContainer}>
              <SimpleLineIcons name='camera' size={40} />
            </View>
          )}
        </View>
        <View style={styles.instructionContainer}>
          {mapThumbnailUrl ? (
            <TouchableOpacity style={styles.mapThumbnailContainer} onPress={this.handleMapPress}>
              <Image
                source={{uri: mapThumbnailUrl}}
                style={styles.mapThumbnail}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.mapThumbnailContainer}>
              <Text style={styles.noLocationInfoText}>🚷</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            { !!name && (
              <Text style={styles.instructionText}>{name}</Text>
            )}
            <Text style={styles.instructionText}>{text}</Text>
            <TouchableOpacity style={styles.editButtonContainer} onPress={this.handleEditButton}>
              <Text style={styles.editButton}>오류 수정 또는 내용 추가하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

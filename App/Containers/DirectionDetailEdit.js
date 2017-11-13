import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { Camera, Location, Permissions } from 'expo'

import RoundedButton from '../Components/RoundedButton'
import styles from './Styles/DirectionDetailEditStyles'

class DirectionDetailEdit extends React.Component {
  static propTypes = {
    waypointId: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    isNew: PropTypes.bool,
    isCurrent: PropTypes.bool
  }

  state = {
    hasCameraPermission: null,
    isCameraShooting: false,
    image: null,
    location: {},
    edited: false
  }

  async componentDidMount () {
    const { isNew } = this.props
    if (isNew) {
      await this.enterCameraMode()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isCurrent } = this.props
    if (isCurrent && !nextProps.isCurrent) {
      // make sure disable camera
      this.setState({
        isCameraShooting: false
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
      const { uri } = await this.camera.takePictureAsync()
      this.setState({
        isCameraShooting: false,
        image: uri,
        edited: true
      })

      const location = await Location.getCurrentPositionAsync({})
      this.setState({
        location
      })

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

  render () {
    const { image, text } = this.props
    const { image: cameraImage, isCameraShooting, hasCameraPermission } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          { hasCameraPermission && isCameraShooting ? (
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
          ) : ([
            <Image
              key={'image'}
              source={{uri: cameraImage || image}}
              style={styles.image}
              resizeMode={'contain'}
            />,
            <View key={'buttons'} style={styles.imageButtonContainer}>
              <RoundedButton onPress={() => this.enterCameraMode()}>
                {image ? '다시 찍기' : '사진 찍기'}
              </RoundedButton>
            </View>
          ])}
        </View>
        <View style={styles.signContainer}>
          <Text>길설명 아이콘 여기..</Text>
        </View>
        <View style={styles.textContainer}>
          {/* <TextInput editable multiline style={styles.instructionText}>{text}</TextInput> */}
          <Text style={styles.instructionText}>{text}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { waypoint } = state
  console.log(ownProps)
  const { waypointId } = ownProps

  const { image, text } = _.get(waypoint, [waypointId], {})

  return {
    id: waypointId,
    image,
    text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionDetailEdit)

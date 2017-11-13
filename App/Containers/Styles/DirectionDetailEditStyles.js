import { StyleSheet } from 'react-native'
import { Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    aspectRatio: 1
  },
  instructionContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  cameraButtonContainer: {
    // flex: 0.5,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  cancelButton: {
    flex: 1,
    alignSelf: 'center'
  },
  snapButton: {
    flex: 1,
    alignSelf: 'center'
  },
  stub: {
    flex: 1
  },
  signContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  instructionText: {
    ...Fonts.style.normal
  },
  imageButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

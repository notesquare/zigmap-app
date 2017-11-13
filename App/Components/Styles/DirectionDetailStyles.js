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
  mapThumbnailContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  mapThumbnail: {
    width: '100%',
    height: '100%'
  },
  noLocationInfoText: {
    fontSize: 30
  },
  map: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  editButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  editButton: {
    ...Fonts.style.small
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
  imageButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImageText: {
    fontSize: 40
  },
  instructionText: {
    ...Fonts.style.normal
  },
  nameContainer: {

  },
  nameText: {
    ...Fonts.style.normal
  }
})

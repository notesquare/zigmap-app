import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  primaryContainer: {
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
  secondaryContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 80,
    height: 80,
    backgroundColor: '#cccccc80'
  },
  mapThumbnailContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  cancelSnapButton: {
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
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
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
    paddingHorizontal: 10
  },
  nameText: {
    ...Fonts.style.normal
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tagText: {
    ...Fonts.style.normal,
    marginRight: 10
  },
  mapIcon: {
    fontSize: 30,
    color: Colors.red
  },
  bottomContainer: {
    flexDirection: 'row'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.finish
  },
  saveButton: {
    flex: 2,
    backgroundColor: Colors.start
  }
})

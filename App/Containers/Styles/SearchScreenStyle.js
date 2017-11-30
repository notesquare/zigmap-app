import { StyleSheet } from 'react-native'
import { Constants } from 'expo'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.searchHeaderBackground
  },
  searchContainer: {
    paddingVertical: 10
  },
  startIcon: {
    fontSize: 25,
    // color: '#ffffff'
    color: Colors.start
  },
  finishIcon: {
    fontSize: 25,
    // color: '#ffffff'
    color: Colors.finish
  },
  resultsContainer: {
    paddingTop: 15,
    flex: 1
  },
  mainContainer: {
    flex: 5,
    backgroundColor: Colors.background,
    justifyContent: 'center'
  },
  locationContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 1,
    height: 40,
    marginLeft: 10
  },
  startInputBox: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.start,
    overflow: 'hidden',
    backgroundColor: Colors.searchHeaderInputBox,
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  finishInputBox: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.finish,
    overflow: 'hidden',
    backgroundColor: Colors.searchHeaderInputBox,
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center'
  },
  travelModesContainer: {
    marginLeft: 10,
    paddingVertical: 5,
    flexDirection: 'row'
  },
  travelModeContainer: {
    marginRight: 10
  },
  filterText: {
    ...Fonts.style.small,
    color: '#ffffff'
  },
  timeline: {
    width: 4,
    marginTop: -8,
    marginLeft: -2,
    marginBottom: -8,
    flex: 1,
    flexDirection: 'column'
  },
  popupContainer: {
    width: '80%',
    height: '60%'
  },
  inputText: {
    ...Fonts.style.normal
  },
  inputTextLow: {
    ...Fonts.style.normal,
    color: '#aaa'
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  controlContainer: {
    flex: 1,
    backgroundColor: '#D9D9D9'
  },
  disclaimerContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  disclaimerImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain'
  },
  disclaimerText: {
    ...Fonts.style.small
  }
})

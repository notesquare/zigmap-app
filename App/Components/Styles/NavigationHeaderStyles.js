import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    height: 50 + Metrics.statusBarHeight,
    paddingTop: Metrics.statusBarHeight,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.headerBackgroundDarker,
    backgroundColor: Colors.headerBackground
  },
  timelineContainer: {
    width: '15%',
    alignItems: 'center'
  },
  closeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  closeButton: {
    fontSize: 25,
    color: Colors.white
  },
  pointIcon: {
    fontSize: 25,
    color: Colors.start
  },
  title: {
    ...Fonts.style.locationName,
    color: '#ffffff'
  },
  stub: {
    flex: 1
  }
})

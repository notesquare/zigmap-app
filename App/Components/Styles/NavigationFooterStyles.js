import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.headerBackgroundDarker,
    backgroundColor: Colors.headerBackground
  },
  timelineContainer: {
    width: '15%',
    alignItems: 'center'
  },
  title: {
    ...Fonts.style.locationName,
    color: Colors.white
  },
  pointIcon: {
    fontSize: 25,
    color: Colors.finish
  }
})

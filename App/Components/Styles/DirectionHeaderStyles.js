import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.headerBackground,
    flexDirection: 'row',
    paddingTop: Metrics.statusBarHeight,
    height: 50 + Metrics.statusBarHeight
  },
  backButtonContainer: {
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 5,
    justifyContent: 'center'
  },
  backButton: {
    fontSize: 30,
    color: Colors.white
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    ...Fonts.style.header,
    color: Colors.white
  }
})

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.header,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  listContent: {
    paddingTop: Metrics.statusBarHeight + 30
  },
  right: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row'
  },
  rowContainer: {
    paddingVertical: 10,
    marginBottom: 15
  },
  swipeContainer: {
    paddingHorizontal: 20
  },
  backgroundImage: {
    width: 80,
    height: 80
  },
  backgroundImageContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

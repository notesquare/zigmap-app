import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  header: {
    marginTop: Metrics.statusBarHeight,
    backgroundColor: Colors.header
  },
  headerModal: {
    backgroundColor: Colors.header,
    marginTop: Metrics.statusBarHeight
  },
  headerTitle: {
    ...Fonts.style.header,
    color: Colors.headerText
  }
})

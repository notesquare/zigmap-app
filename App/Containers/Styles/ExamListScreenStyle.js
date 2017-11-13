import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.list,
  searchContainer: {
    height: Metrics.searchBarHeight + 3 * Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin,
    backgroundColor: '#333',
    justifyContent: 'center'
  }
})

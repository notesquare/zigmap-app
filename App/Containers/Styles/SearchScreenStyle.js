import { StyleSheet } from 'react-native'
import { Constants } from 'expo'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  resultsContainer: {
    flex: 5
  },
  controlContainer: {
    // flex: 1,
    backgroundColor: 'yellow'
  },
  fromContainer: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 10
  },
  toContainer: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 10
  },
  filterContainer: {
    height: 30,
    backgroundColor: 'yellow',
    paddingBottom: 10
  }
})

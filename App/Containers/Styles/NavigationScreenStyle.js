import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.header,
  container: {
    flex: 1
  },
  waypointsContainer: {
    paddingTop: 20,
    height: 100,
    flexDirection: 'row'
  },
  directionContainer: {
    flex: 4
  },
  slideItem: {
    flex: 1
  },
  headerRightButton: {
    flex: 1,
    width: 40,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderLeftWidth: 1
  },
  directionItemContainer: {
    flex: 1
  },
  popupView: {
    width: '90%',
    height: '80%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row'
  }
})

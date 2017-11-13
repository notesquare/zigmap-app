import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.list,
  progressContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBG: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.3
  },
  progressText: {
    color: 'white',
    fontSize: 20
  },
  selected: {
    backgroundColor: 'red'
  },
  dateText: {
    ...Fonts.style.small
  },
  messageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    flex: 1
  },
  right: {
    marginRight: 15
  },
  countdownText: {
    ...Fonts.style.normal
  },
  last: {
    // alignSelf: 'center',
    ...Fonts.style.small
  }
})

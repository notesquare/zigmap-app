import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.header,
  progress1: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: '#05aeab'
  },
  progress2: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: '#05aeab',
    opacity: 0.3
  }
})

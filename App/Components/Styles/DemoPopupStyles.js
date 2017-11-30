import { StyleSheet } from 'react-native'
import { Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  map: {
    flex: 1
  },
  text: {
    ...Fonts.style.normal
  },
  buttonContainer: {
    flex: 1
  }
})

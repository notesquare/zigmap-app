import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 2,
    marginLeft: 5,
    backgroundColor: Colors.red,
    height: Fonts.style.small.lineHeight + 6
  },
  text: {
    ...Fonts.style.small,
    color: '#fff'
  }
})

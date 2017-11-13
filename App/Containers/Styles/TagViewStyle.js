import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  popupContent: {
    padding: 20
  },
  text: {
    ...Fonts.style.normal
  },
  bottom: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: Metrics.smallMargin,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    marginRight: 10,
    color: '#fff'
  },
  buttonText: {
    ...Fonts.style.normal,
    color: '#ffffff'
  }
})

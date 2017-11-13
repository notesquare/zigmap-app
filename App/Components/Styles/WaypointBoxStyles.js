import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    minWidth: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 50,
    height: 50
  },
  selected: {
    borderColor: 'red',
    borderWidth: StyleSheet.hairlineWidth * 2
  }
})

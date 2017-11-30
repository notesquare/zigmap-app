import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  left: {
    flex: 3,
    borderRightWidth: 5,
    borderRightColor: Colors.point1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  right: {
    flex: 2
  },
  methodContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center'
  },
  dot: {
    // position: 'absolute',
    // top: '50%',
    fontSize: 20,
    marginRight: -11,
    marginTop: -50,
    backgroundColor: 'transparent',
    color: Colors.point2
  },
  text: {
    ...Fonts.small
  }
})

import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    ...Fonts.tiny
  },
  dotDotDot: {
    marginLeft: 50,
    height: 20,
    width: 1,
    flexDirection: 'column'
    // borderRightWidth: 5,
    // borderColor: Colors.point1,
    // borderWidth: 3,
    // marginTop: -3,
    // overflow: 'hidden',
    // marginBottom: -3,
    // borderStyle: 'dotted'
  },
  innerDotDotDot: {
    position: 'absolute',
    left: 50,
    top: 0,
    bottom: 0,
    flexDirection: 'column'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.point1
  },
  modeIcon: {
    marginTop: 0,
    width: 20,
    height: 20,
    backgroundColor: 'transparent'
  },
  mainContainer: {
    flexDirection: 'row',
    marginLeft: 42.5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginLeft: -1,
    marginRight: -1,
    marginTop: 15,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: Colors.point2,
    backgroundColor: Colors.white
  },
  showMoreIcon: {
    fontSize: 15,
    marginRight: 2,
    color: Colors.point2
  },
  showMoreButtonText: {
    color: Colors.point2
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
    // borderRadius: 3,
    // backgroundColor: '#2494C4'
  },
  trafficStatusText: {
    marginLeft: 10,
    ...Fonts.tiny,
    color: Colors.point2
  }
})

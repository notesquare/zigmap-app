import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

const triangleHeight = 30
const triangleWidth = 40
const arrowColor = 'blue'
const lineWidth = 10

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: Colors.background
  },
  shapeContainer: {
    marginRight: 5,
    width: '75%',
    height: '50%',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  textContainer: {
    flex: 2
  },
  text: {
    ...Fonts.style.large,
    alignSelf: 'center'
  },
  arrow: {
    flex: 1,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 15
  },
  body: {
    flex: 1,
    width: lineWidth,
    marginRight: (triangleWidth - lineWidth) / 2.0,
    backgroundColor: arrowColor
  },
  triangle: {
    width: triangleWidth,
    height: triangleHeight,
    borderTopWidth: 0,
    borderRightWidth: triangleWidth / 2.0,
    borderBottomWidth: triangleHeight,
    borderLeftWidth: triangleWidth / 2.0,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: arrowColor,
    borderLeftColor: 'transparent'
  },
  line: {
    height: lineWidth,
    backgroundColor: arrowColor
  },
  lineContainer: {
    width: '100%',
    paddingRight: (triangleWidth - lineWidth) / 2.0
  }
})

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.card,
  textContainer: {
    flex: 4
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  lowerOpacity: {
    opacity: 0.9
  },
  infoContainer: {
    flex: 1,
    width: '100%'
  },
  paddingContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  emphasis1: {
    ...Fonts.style.card,
    color: Colors.red
  },
  emphasis2: {
    ...Fonts.style.card,
    color: Colors.yellow
  },
  emphasis3: {
    ...Fonts.style.card,
    color: Colors.green
  },
  underline: {
    ...Fonts.style.card,
    textDecorationLine: 'underline'
  },
  answer: {
    ...Fonts.style.card,
    color: Colors.red
  },
  largeCenterContainer: {
    alignItems: 'center',
    flex: 1
  },
  largeCenter: {
    ...Fonts.style.cardLarge
  },
  rows: {
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent'
  },
  fillInBox: {
    textDecorationLine: 'underline'
  }
})

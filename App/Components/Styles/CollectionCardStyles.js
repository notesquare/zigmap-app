import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    display: 'flex',
    height: 100 // should be determined dynamically
  },
  backgroundImage: {
    position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10 // bug in android https://github.com/facebook/react-native/issues/3198#issuecomment-286122690
  },
  cardContainer: {
    display: 'flex',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // flex: 1,
    height: '100%'
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}a0`,
    paddingHorizontal: 20,
    // bug in android https://github.com/facebook/react-native/issues/3198#issuecomment-286122690
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cardText: {
    ...Fonts.style.normal,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: '#585858',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    backgroundColor: 'transparent'
  },
  rowInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
    alignItems: 'flex-end',
    paddingRight: 10
    // justifyContent: 'space-between'
  },
  tagContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  statContainer: {
    flex: 3,
    flexDirection: 'column'
  },
  stat: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  statText: {
    ...Fonts.style.medium,
    backgroundColor: `${Colors.primary}a0`,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5
  }
})

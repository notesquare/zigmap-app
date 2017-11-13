import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    height: 150 // should be determined dynamically
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10 // bug in android https://github.com/facebook/react-native/issues/3198#issuecomment-286122690
  },
  cardContainer: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10
  },
  text: {
    ...Fonts.style.card,
    fontWeight: '900',
    color: Colors.primary,
    backgroundColor: 'transparent'
  },
  rowInfoContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: 10
    // justifyContent: 'space-between'
  },
  tagContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  disclaimer: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10
  },
  disclaimerText: {
    ...Fonts.style.small
  }
})

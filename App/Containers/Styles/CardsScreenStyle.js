import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'column'
  },
  topContainer: {
    flex: 1
  },
  bgContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  right: {
    backgroundColor: 'green'
  },
  wrong: {
    backgroundColor: 'red'
  },
  bottomContainer: {
    flex: 1
  },
  item1: {
    backgroundColor: Colors.cardSelections[0]
  },
  item2: {
    backgroundColor: Colors.cardSelections[1]
  },
  item3: {
    backgroundColor: Colors.cardSelections[2]
  },
  item4: {
    backgroundColor: Colors.cardSelections[3]
  },
  messageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageText: {
    ...Fonts.style.normal
  },
  slideItem: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 10,
    flex: 1
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    flexDirection: 'row',
    height: 45,
    overflow: 'hidden'
  },
  saved: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  savedIcon: {
    color: Colors.linkText,
    marginRight: 3,
    backgroundColor: 'transparent'
  },
  savedIconSelected: {
    color: Colors.linkText
  },
  linkText: {
    ...Fonts.style.medium,
    color: Colors.linkText,
    backgroundColor: 'transparent'
  },
  loadingContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  officialText: {
    ...Fonts.style.medium,
    color: '#ffffff'
  },
  popupView: {
    width: '90%',
    height: '80%'
  }
})

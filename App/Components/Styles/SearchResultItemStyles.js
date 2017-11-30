import { StyleSheet } from 'react-native'
import { Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  headerContainer: {
    flex: 1
  },
  typeText: {
    ...Fonts.style.normal
  },
  totalTimeText: {
    ...Fonts.style.normal
  },
  icon: {
    marginLeft: 10,
    fontSize: 20
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modeIcon: {
    width: 25,
    height: 25
  },
  mainContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: -5
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  modeTimeText: {
    ...Fonts.style.small
  }
})

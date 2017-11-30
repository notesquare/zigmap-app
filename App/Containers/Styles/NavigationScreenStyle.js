import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.header,
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  waypointsContainer: {
    paddingTop: 20,
    height: 100,
    flexDirection: 'row'
  },
  directionContainer: {
    flex: 4
  },
  slideItem: {
    flex: 1
  },
  headerRightButton: {
    flex: 1,
    width: 40,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderLeftWidth: 1
  },
  directionItemContainer: {
    flex: 1
  },
  popupView: {
    width: '90%',
    height: '80%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row'
  },
  mainContainer: {
    flex: 1
  },
  sectionHeader: {
    height: 1,
    alignSelf: 'flex-end',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end'
    backgroundColor: 'transparent'
  },
  sectionContainer: {
    alignSelf: 'flex-end',
    flex: 1,
    marginTop: 20,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  sectionText: {
    alignSelf: 'flex-end'
  },
  sectionIcon: {
    fontSize: 18
  },
  timelineContainer: {
    position: 'absolute',
    top: 0,
    width: '15%',
    left: 0,
    bottom: 0
  },
  timeline: {
    marginLeft: 50,
    height: '100%',
    width: 5,
    flexDirection: 'column'
  }
})

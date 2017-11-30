import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 60,
    alignItems: 'center'
  },
  timelineContainer: {
    width: '15%'
  },
  mainContainer: {
    flex: 1
  },
  cardContainer: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 4,
    flexDirection: 'row'
  },
  leftContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingVertical: 10
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 10,
    aspectRatio: 1,
    width: '80%'
  },
  titleContainer: {
  },
  title: {
    ...Fonts.style.locationName
  },
  image: {
    width: '100%',
    height: '100%'
  },
  rightButton: {
    fontSize: 25,
    color: Colors.white
  },
  rightImage: {
    width: 25,
    height: 25
  },
  buttonContainer: {
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.point1
  }
})

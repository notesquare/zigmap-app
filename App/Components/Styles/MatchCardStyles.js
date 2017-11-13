import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.card,
  front: {
    // ...ApplicationStyles.card.container,
    backgroundColor: Colors.cardFront
  },
  back: {
    // ...ApplicationStyles.card.container,
    backgroundColor: Colors.cardBack
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    flexDirection: 'row'
  },
  savedIcon: {
    color: Colors.charcoal
  },
  savedIconSelected: {
    color: 'yellow'
  },
  textContainer: {
    flex: 1,
    paddingLeft: Metrics.cardPadding,
    paddingRight: Metrics.cardPadding,
    paddingTop: Metrics.cardPadding
  },
  empty: {
    ...Fonts.style.card
  },
  frontCardText: {
    ...Fonts.style.card,
    backgroundColor: 'transparent',
    color: Colors.primary
  },
  backCardText: {
    ...Fonts.style.card,
    backgroundColor: 'transparent',
    color: '#fff'
  },
  answerText: {
    ...Fonts.style.card,
    color: Colors.red
  }
})

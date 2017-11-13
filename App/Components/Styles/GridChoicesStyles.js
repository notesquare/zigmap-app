import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  choicesContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  etcSection: {
    minHeight: 50,
    justifyContent: 'center'
  },
  etcTextContainer: {
    paddingLeft: Metrics.cardScreenMarginLeft,
    paddingRight: Metrics.cardScreenMarginLeft / 2
  },
  etcText: {
    ...Fonts.style.medium,
    color: Colors.textLow,
    marginLeft: Metrics.cardPadding,
    backgroundColor: 'transparent'
  },
  choice: {
    width: '50%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  rowTextContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080'
  },
  rowText: {
    ...Fonts.style.card,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  choiceTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Fonts.style.tag.fontSize * 1.8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    marginRight: 5,
    justifyContent: 'center'
  },
  choiceTagText: {
    ...Fonts.style.tag,
    backgroundColor: 'transparent'
  },
  rightTag: {
    borderColor: Colors.priamry
  },
  rightTagText: {
    color: Colors.primary
  },
  wrongTag: {
    borderColor: Colors.red
  },
  wrongTagText: {
    color: Colors.red
  }
})

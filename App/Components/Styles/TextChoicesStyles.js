import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
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
  tagContainer: {
    justifyContent: 'center'
  },
  preTag: {
    width: Metrics.cardScreenMarginLeft + Metrics.cardPadding / 2
  },
  tag: {
    height: Fonts.style.tag.fontSize * 1.8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.tagBorder,
    borderRadius: 0,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 10,
    justifyContent: 'center'
  },
  tagText: {
    ...Fonts.style.tag,
    color: Colors.tag,
    backgroundColor: 'transparent'
  },
  choice: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -1
  },
  icon: {
    position: 'absolute',
    right: 10,
    fontSize: 30,
    alignContent: 'center',
    backgroundColor: 'transparent'
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: Metrics.cardScreenMarginLeft,
    flexDirection: 'row'
  },
  animatedContainer: {
    position: 'absolute',
    backgroundColor: Colors.choiceBackground,
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  rowText: {
    flex: 1,
    ...Fonts.style.normal,
    marginLeft: Metrics.cardPadding,
    backgroundColor: 'transparent'
  },
  choiceText: {
    color: '#fff',
    backgroundColor: 'transparent'
  },
  wrongChoiceText: {
    color: '#aaa'
  },
  choiceTag: {
    height: Fonts.style.tag.fontSize * 1.8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: Metrics.cardScreenMarginLeft,
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

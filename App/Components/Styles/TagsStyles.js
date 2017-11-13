import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
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
  specialTag: {
    height: Fonts.style.tag.fontSize * 1.8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.specialTag,
    borderRadius: 0,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 10,
    justifyContent: 'center'
  },
  specialTagText: {
    ...Fonts.style.tag,
    color: Colors.specialTag,
    backgroundColor: 'transparent'
  }
})

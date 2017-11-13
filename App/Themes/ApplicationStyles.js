import {StyleSheet} from 'react-native'
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      // paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    },
    debugView: {
      position: 'absolute',
      bottom: 0,
      width: 120,
      right: 0,
      opacity: 0.5
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    fullLoadingContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
  list: {
    row: {
      // height: 50,
      // backgroundColor: Colors.secondary,
      alignItems: 'flex-start',
      justifyContent: 'center',
      // marginTop: 5,
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 15,
      // marginBottom: 5,
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    rowLabel: {
      ...Fonts.style.normal,
      fontSize: 15
    },
    rowArrow: {
      position: 'absolute',
      right: 15,
      color: '#333'
    }
  },
  header: {
    headerModal: {
      backgroundColor: Colors.secondary
    },
    header: {
      marginTop: 20,
      height: 50
    },
    headerContent: {
      flex: 1,
      // marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center'
      // backgroundColor: Colors.header
    },
    headerText: {
      ...Fonts.style.header,
      color: Colors.headerText,
      backgroundColor: 'transparent'
    },
    headerRight: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerRightButton: {
      width: 50,
      marginRight: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    }
  },
  card: {
    container: {
      flex: 1,
      borderRadius: 10,
      // marginTop: 40,
      // marginBottom: 40,
      // marginLeft: 10,
      // marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.cardFront,
      overflow: 'hidden',
      borderWidth: 0.3,
      borderColor: Colors.cardBorder,
      position: 'relative'
    },
    text: {
      ...Fonts.style.card,
      backgroundColor: 'transparent',
      textAlignVertical: 'center',
      includeFontPadding: false
    },
    textBox: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#fff',
      marginLeft: 5,
      marginRight: 5
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain'
    },
    dimmed: {
      opacity: 0.4
    }
  }
}

export default ApplicationStyles

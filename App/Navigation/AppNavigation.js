import { StackNavigator } from 'react-navigation'
import NavigationScreen from '../Containers/NavigationScreen'
import SearchScreen from '../Containers/SearchScreen'
import DirectionScreen from '../Containers/DirectionScreen'

import Strings from '../Fixtures/strings.json'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      headerMode: 'none',
      header: null,
      // headerStyle: styles.headerModal,
      title: Strings.TITLE_APP
    }
  },
  NavigationScreen: {
    screen: NavigationScreen,
    navigationOptions: {
      headerMode: 'none',
      header: null,
      // headerStyle: styles.headerModal,
      title: Strings.TITLE_APP
    }
  },
  DirectionScreen: {
    screen: DirectionScreen,
    navigationOptions: {
      headerMode: 'none',
      header: null
    }
  }
}, {
  // Default config for all screens
  initialRouteName: 'SearchScreen',
  // mode: 'modal',
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  }
})

export default PrimaryNav

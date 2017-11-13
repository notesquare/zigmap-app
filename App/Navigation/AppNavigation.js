import { StackNavigator } from 'react-navigation'
import NavigationScreen from '../Containers/NavigationScreen'
import SearchScreen from '../Containers/SearchScreen'

import Strings from '../Fixtures/strings.json'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      // headerMode: 'none'
      // headerStyle: styles.headerModal,
      title: Strings.TITLE_APP
    }
  },
  NavigationScreen: {
    screen: NavigationScreen,
    navigationOptions: {
      // headerMode: 'none'
      // headerStyle: styles.headerModal,
      title: Strings.TITLE_APP
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

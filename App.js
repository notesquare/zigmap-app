import React from 'react'
import { Font, AppLoading } from 'expo'
import './App/Config/ReactotronConfig'
import App from './App/Containers/App'
import Images from './App/Themes/Images'

console.ignoredYellowBox = [
  'FIREBASE WARNING:',
  'Warning: PropTypes',
  'Setting a timer' // yet another firebase warning on long settimeout
]

export default class EntryApp extends React.Component {
  state = {
    initialized: false
  }

  async componentDidMount () {
    await Font.loadAsync({
      'NanumBarunGothic': require('./assets/fonts/NanumBarunGothic.ttf'),
      'NanumBarunGothic Bold': require('./assets/fonts/NanumBarunGothicBold.ttf')
    })

    await Promise.all([
      // load all images here
      // ..._.map(Images, image => Asset.fromModule(image).downloadAsync())
      ...Images
    ])

    this.setState({ initialized: true })
  }

  render () {
    if (!this.state.initialized) {
      return <AppLoading />
    }

    return <App />
  }
}

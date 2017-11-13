import Config from '../Config/DebugConfig'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import { NativeModules } from 'react-native'
import url from 'url'

if (Config.useReactotron) {
  const { hostname } = url.parse(NativeModules.SourceCode.scriptURL)
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({ name: 'Ignite App', host: hostname })
    .useReactNative()
    .use(reduxPlugin({ onRestore: state => {
      return {
        card: Immutable(state.card),
        collection: Immutable(state.collection),
        set: Immutable(state.set)
      }
    }}))
    .use(sagaPlugin())
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
}

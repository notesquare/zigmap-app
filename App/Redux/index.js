import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */

  const rootReducer = combineReducers({
    current: require('./CurrentRedux').reducer,
    waypoint: require('./WaypointRedux').reducer,
    direction: require('./DirectionRedux').reducer,
    pave: require('./PaveRedux').reducer,
    search: require('./SearchRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}

import _ from 'lodash'
import { put, call, all } from 'redux-saga/effects'

import SearchActions from '../Redux/SearchRedux'
import WaypointActions from '../Redux/WaypointRedux'

// process STARTUP actions
export const startup = function * startup (api, action) {
  yield call(api.loginAnonymously)

  // TESTONLY
  // add custom route results for test
  const { data = {} } = yield call(api._getDefaultData)

  // get all waypoints data
  const waypointIds = [data.from.id, data.to.id]

  yield all(_.map(waypointIds, waypointId => put(WaypointActions.getWaypointRequest(waypointId))))

  yield put(SearchActions.setSearchData({ route: data }))
}

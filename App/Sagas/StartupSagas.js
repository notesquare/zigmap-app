import _ from 'lodash'
import { put, call, all } from 'redux-saga/effects'

import SearchActions from '../Redux/SearchRedux'
import WaypointActions from '../Redux/WaypointRedux'

// process STARTUP actions
export const startup = function * startup (api, action) {
  // yield call(api.loginAnonymously)
  // TESTONLY
  const { data = {} } = yield call(api.getSearchResults)
  // get all waypoints data
  const waypointIds = _.chain(data)
    .flatMap(doc => _.chain(doc)
      .get(['results'])
      .flatMap(result => _.flatMap(result.directions, direction => [
        _.get(direction, 'from.id'), _.get(direction, 'to.id')
      ]))
      .filter()
      .value()
    )
    .uniq()
    .value()

  yield all(_.map(waypointIds, waypointId => put(WaypointActions.getWaypointRequest(waypointId))))

  yield put(SearchActions.setSearchData({ _debug: data }))
}

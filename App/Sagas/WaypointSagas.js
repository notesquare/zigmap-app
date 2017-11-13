import _ from 'lodash'
import { put, call, select } from 'redux-saga/effects'

import WaypointActions from '../Redux/WaypointRedux'

const getWaypointData = (state, waypointId) => _.get(state.waypoint, [waypointId], {})

export const getWaypoint = function * getWaypoint (api, { waypointId }) {
  const { data = {}, error } = yield call(api.getWaypoint, waypointId)
  if (error) {
    yield put(WaypointActions.getWaypointFailure(waypointId))
    return
  }

  yield put(WaypointActions.getWaypointSuccess(waypointId, data))
}

export const saveWaypoint = function * saveWaypoint (api, { waypointId }) {
  // store pave data back to the server
  const data = yield select(getWaypointData, waypointId)
  const { saved } = data
  if (saved) {
    yield put(WaypointActions.saveWaypointFailure(waypointId))
    return
  }

  const saveData = _.pick(data, ['name', 'text', 'location', 'type'])

  const { error } = yield call(api.saveWaypoint, waypointId, saveData)
  if (error) {
    yield put(WaypointActions.saveWaypointFailure(waypointId))
    return
  }

  yield put(WaypointActions.saveWaypointSuccess(waypointId))
}

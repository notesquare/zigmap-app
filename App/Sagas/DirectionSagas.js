import _ from 'lodash'
import { put, call, select, take, all } from 'redux-saga/effects'
import DirectionActions from '../Redux/DirectionRedux'
import CurrentActions, { CurrentTypes } from '../Redux/CurrentRedux'
import WaypointActions, { WaypointTypes } from '../Redux/WaypointRedux'

const getDirectionData = (state, directionId) => _.get(state.direction, [directionId], {})
const getCurrentDirections = (state) => _.get(state.current, ['directions'], [])
const getWaypoint = (state, waypointId) => _.get(state.waypoint, [waypointId], {})

export const getDirection = function * getDirection (api, { directionId }) {
  const { data = {}, error } = yield call(api.getDirection, directionId)
  if (error) {
    yield put(DirectionActions.getDirectionFailure(directionId))
    return
  }

  yield put(DirectionActions.getDirectionSuccess(directionId, { saved: true, ...data }))

  // ask for all waypoints
  const { from: fromWaypointId, to: toWaypointId } = data
  // check if waypoint is already loaded or loading
  const [
    {fetched: fromFetched, fetching: fromFetching},
    {fetched: toFetched, fetching: toFetching}
  ] = yield all([
    select(getWaypoint, fromWaypointId),
    select(getWaypoint, toWaypointId)
  ])

  console.log(fromWaypointId, toWaypointId)
  yield all([
    !fromFetched && !fromFetching && put(WaypointActions.getWaypointRequest(fromWaypointId)),
    !toFetched && !toFetching && put(WaypointActions.getWaypointRequest(toWaypointId))
  ])
}

export const saveDirection = function * saveDirection (api, { directionId }) {
  // store direction data back to the server
  const data = yield select(getDirectionData, directionId)
  const { saved, from, to } = data
  if (saved) {
    yield put(DirectionActions.saveDirectionFailure(directionId))
    return
  }

  // save all waypoints and wait (ignore error)
  yield all([
    put(WaypointActions.saveWaypointRequest(from)),
    put(WaypointActions.saveWaypointRequest(to))
  ])
  yield all(_.range(2).map(() =>
    take([
      WaypointTypes.SAVE_WAYPOINT_SUCCESS,
      WaypointTypes.SAVE_WAYPOINT_FAILURE
    ])
  ))

  // TODO
  // const saveData = _.pick(data, ['from', 'to', 'type', 'time', 'imageUrl', 'directionVector'])
  // const { error } = yield call(api.saveDirection, directionId, saveData)
  // if (error) {
  //   yield put(DirectionActions.saveDirectionFailure(directionId))
  //   return
  // }

  yield put(DirectionActions.saveDirectionSuccess(directionId))
}

export const editDirection = function * editDirection (api, { directionId, data = {} }) {
  // 1. get current direction data
  const directionData = yield select(getDirectionData, directionId)

  // 2. create a new directionId
  const { saved } = directionData
  // make sure 'saved' field in new data is false
  const newDirectionData = {
    ...directionData,
    ...data,
    saved: false
  }
  if (!saved) {
    // simply update the data since it is not saved yet
    yield put(DirectionActions.setDirection(directionId, newDirectionData))
  } else {
    yield put(CurrentActions.createDirectionRequest(newDirectionData))
    const { directionId: newDirectionId, error } = yield take([
      CurrentTypes.CREATE_DIRECTION_SUCCESS,
      CurrentTypes.CREATE_DIRECTION_FAILURE
    ])
    if (error) {
      yield put(DirectionActions.editDirectionFailure(directionId))
      return
    }

    // update directionId with newDirectionId in state.current
    // set new directions
    const directions = yield select(getCurrentDirections)
    const newDirections = _.map(directions, direction => {
      const { id } = direction
      if (id === directionId) return { id: newDirectionId }
      return direction
    })
    yield put(CurrentActions.setDirections(newDirections))
  }

  // 3. done
  yield put(DirectionActions.editDirectionSuccess(directionId))
}

export const saveDirectionPoints = function * saveDirectionPoints (api, { directionId, points }) {
  yield call(api.saveDirectionPoint, directionId, points)
}

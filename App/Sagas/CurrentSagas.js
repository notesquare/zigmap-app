import _ from 'lodash'
import { put, all, take, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import shortid from 'shortid'
import Immutable from 'seamless-immutable'

import CurrentActions, { CurrentTypes } from '../Redux/CurrentRedux'
import DirectionActions from '../Redux/DirectionRedux'
import WaypointActions from '../Redux/WaypointRedux'
import SearchActions from '../Redux/SearchRedux'
import PaveActions from '../Redux/PaveRedux'
import NavigatorService from '../Services/Navigator'

const getCurrentDirections = (state) => _.get(state.current, ['directions'], [])
const getSearchRouteData = (state) => _.get(state.search, ['route'])
const getAllDirectionIds = (state) => _.keys(state.direction)

export const createNewPave = function * createNewPave (api, { data }) {
  const newPaveId = shortid.generate()
  yield put(PaveActions.setPave(newPaveId, data))
  yield put(CurrentActions.createPaveSuccess(newPaveId))
}

export const createNewDirection = function * createNewDirection (api, { data }) {
  const newDirectionId = shortid.generate()
  yield put(DirectionActions.setDirection(newDirectionId, data))
  yield put(CurrentActions.createDirectionSuccess(newDirectionId))
}

export const openDirections = function * openDirections (api, { directions = [] }) {
  // make sure request all direction
  const existingDirectionIds = yield select(getAllDirectionIds)
  yield all(_.flatMap(directions, ({ directionId: id, detailDirections }) => {
    let ret = []
    if (id && !_.includes(existingDirectionIds, id)) {
      ret.push(put(DirectionActions.getDirectionRequest(id)))
    }
    if (!_.isEmpty(detailDirections)) {
      _.each(detailDirections, directionId => {
        if (!_.includes(existingDirectionIds, directionId)) {
          ret.push(put(DirectionActions.getDirectionRequest(directionId)))
        }
      })
    }
    return ret
  }))

  // make sure request all waypoints
  yield all(_.chain(directions)
    .flatMap(direction => {
      const fromWaypointId = _.get(direction, ['from', 'id'])
      const toWaypointId = _.get(direction, ['to', 'id'])
      return [fromWaypointId, toWaypointId]
    })
    .uniq()
    .filter()
    .map(waypointId => put(WaypointActions.getWaypointRequest(waypointId)))
    .value()
  )

  NavigatorService.dispatch(
    NavigationActions.navigate({
      routeName: 'NavigationScreen',
      params: {}
    })
  )
}

export const openPave = function * openPave (api, { paveId }) {
  if (!paveId) {
    // TODO: create an empty pave and open it
  }

  NavigatorService.dispatch(
    NavigationActions.navigate({
      routeName: 'NavigationScreen',
      params: {editMode: true}
    })
  )
}

export const openDirection = function * openPave (api, { directionId }) {
  NavigatorService.dispatch(
    NavigationActions.navigate({
      routeName: 'DirectionScreen'
      // params: {directionId}
    })
  )
}

export const addEmptyDirection = function * addEmptyDirection (api, { refDirectionId }) {
  // 1. create a new direction with empty data
  yield put(CurrentActions.createDirectionRequest({}))
  const { directionId: newDirectionId, error } = yield take([
    CurrentTypes.CREATE_DIRECTION_SUCCESS,
    CurrentTypes.CREATE_DIRECTION_FAILURE
  ])

  if (error || !newDirectionId) {
    // err
    return
  }

  let directions = Immutable.asMutable(yield select(getCurrentDirections))

  // find the index
  let index = 0
  if (refDirectionId) {
    index = _.findIndex(directions, { id: refDirectionId }) + 1
  }
  directions.splice(index, 0, { id: newDirectionId })

  // 2. update current.directions
  yield put(CurrentActions.setDirections(directions))
}

export const removeDirection = function * removeDirection (api, { directionId }) {
  // remove given directionId from state.current.directions
  let directions = Immutable.asMutable(yield select(getCurrentDirections))
  _.pullAllBy(directions, [{ id: directionId }], 'id')
  yield put(CurrentActions.setDirections(directions))
}

export const saveRoute = function * saveRoute (api, { directions }) {
  // test only
  let searchRouteData = Immutable(yield select(getSearchRouteData)).asMutable()
  // mark all directions as saved
  const directionIds = _.map(directions, 'id')
  yield all(
    _.map(directionIds, directionId => put(DirectionActions.saveDirectionRequest(directionId)))
  )

  searchRouteData.results = [
    ...searchRouteData.results,
    { type: 'xx', directions }
  ]
  yield put(SearchActions.setSearchData({ route: searchRouteData }))
}

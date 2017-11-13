import _ from 'lodash'
import { put, call, select, take, all } from 'redux-saga/effects'
import PaveActions from '../Redux/PaveRedux'
import CurrentActions from '../Redux/CurrentRedux'
import DirectionActions from '../Redux/DirectionRedux'

const getPaveData = (state, paveId) => _.get(state.pave, [paveId], {})

export const getPave = function * getPave (api, { paveId }) {
  const { data = {}, error } = yield call(api.getPave, paveId)
  if (error) {
    yield put(PaveActions.getPaveFailure(paveId))
    return
  }

  yield put(PaveActions.getPaveSuccess(paveId, data))

  // ask for all directions
  const { directions = [] } = data
  yield all(_.map(directions, directionId => put(DirectionActions.getDirectionRequest(directionId))))
}

export const savePave = function * savePave (api, { paveId }) {
  // store pave data back to the server
  const data = yield select(getPaveData, paveId)

  const { saved, directions = [] } = data
  if (saved) {
    // cannot overwrite the pave
    yield put(PaveActions.savePaveFailure(paveId))
    return
  }

  // save all directions and wait (ignore error)
  yield all(_.map(directions, directionId => put(DirectionActions.saveDirectionRequest(directionId))))
  yield all(_.range(directions.length).map(() =>
    take([
      DirectionActions.SAVE_DIRECTION_SUCCESS,
      DirectionActions.SAVE_DIRECTION_FAILURE
    ])
  ))

  const saveData = _.pick(data, ['from', 'to', 'directions'])
  const { error } = yield call(api.savePave, paveId, saveData)
  if (error) {
    yield put(PaveActions.savePaveFailure(paveId))
    return
  }

  yield put(PaveActions.savePaveSuccess(paveId))
}

export const updatePave = function * updatePave (api, { paveId, update = {} }) {
  // # update : {append: {index, data}}
  // # update : {set: {index, data}}
  // 1. get pave data
  const { directions = [] } = yield select(getPaveData, paveId)

  const { append = {}, set = {} } = update

  let newDirections = _.clone(directions)

  if (!_.isEmpty(append)) {
    // append
    const { index, data = {} } = append

    // 2.1. create a new direction
    yield put(CurrentActions.createDirectionRequest(data))
    const { error, directionId: newDirectionId } = yield take([
      CurrentActions.CREATE_DIRECTION_SUCCESS,
      CurrentActions.CREATE_DIRECTION_FAILURE
    ])
    if (error) {
      yield put(PaveActions.updatePaveFailure())
      return
    }

    // 2.2. append
    newDirections.splice(index, 0, newDirectionId)
  }

  if (!_.isEmpty(set)) {
    // set
    const { index, data = {} } = set
    // 3.1. get directionId
    const directionId = _.get(directions, index)
    if (!directionId) {
      yield put(PaveActions.updatePaveFailure())
      return
    }

    // 3.2. create a new direction
    yield put(DirectionActions.editDirectionRequest(directionId, data))
    const { error, directionId: newDirectionId } = yield take([
      DirectionActions.EDIT_DIRECTION_SUCCESS,
      DirectionActions.EDIT_DIRECTION_FAILURE
    ])
    if (error) {
      yield put(PaveActions.updatePaveFailure())
      return
    }

    // 3.3. replace directionId with newDirectionId
    newDirections.splice(index, 1, newDirectionId)
  }

  yield put(PaveActions.updatePaveSuccess(paveId, newDirections))
}

export const editPave = function * editPave (api, { paveId }) {
  // 1. get current direction data
  const data = yield select(getPaveData, paveId)

  // 2. create a new directionId
  yield put(CurrentActions.createPaveRequest(data))
  const { error } = yield take([
    CurrentActions.CREATE_PAVE_SUCCESS,
    CurrentActions.CREATE_PAVE_FAILURE
  ])
  if (error) {
    yield put(PaveActions.editPaveFailure(paveId))
    return
  }

  yield put(PaveActions.editPaveSuccess(paveId))
}

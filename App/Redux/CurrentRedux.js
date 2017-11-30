import _ from 'lodash'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createPaveRequest: ['data'],
  createPaveSuccess: ['paveId'],
  createPaveFailure: null,

  createDirectionRequest: ['data'],
  createDirectionSuccess: ['directionId'],
  createDirectionFailure: null,

  openDirections: ['directions'],
  openPave: ['paveId'],
  openDirection: ['directionId', 'waypointId'],
  setDirections: ['directions'],

  addEmptyDirection: ['refDirectionId'],
  removeDirection: ['directionId'],

  saveRoute: ['directions'],

  expandDirection: ['index']
})

export const CurrentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  newPaveCreating: null,
  newPaveCreateError: null,
  newPaveId: null,

  newDirectionCreating: null,
  newDirectionCreateError: null,
  newDirectionId: null,

  paveId: null,
  directions: [],

  directionsList: [],
  paveIdList: [],

  directionId: null,
  waypointId: null
})

/* ------------- Reducers ------------- */

export const createPaveRequest = (state) =>
  state.merge({
    newPaveCreating: true,
    newPaveCreateError: false,
    newPaveId: null
  })

export const createPaveSuccess = (state, { paveId }) =>
  state.merge({
    newPaveCreating: false,
    newPaveId: paveId
  })

export const createPaveFailure = (state) =>
  state.merge({
    newPaveCreating: false,
    newPaveCreateError: true
  })

export const createDirectionRequest = (state) =>
  state.merge({
    newDirectionCreating: true,
    newDirectionCreateError: false,
    newDirectionId: null
  })

export const createDirectionSuccess = (state, { directionId }) =>
  state.merge({
    newDirectionCreating: false,
    newDirectionId: directionId
  })

export const createDirectionFailure = (state) =>
  state.merge({
    newDirectionCreating: false,
    newDirectionCreateError: true
  })

export const setCurrentDirections = (state, { directions = [] }) =>
  state.merge({
    directions,
    directionsList: [
      ...state.getIn(['directionsList']),
      directions
    ]
  })

export const setCurrentPaveId = (state, { paveId }) =>
  state.merge({
    directions: []
    // paveId,
    // paveIdList: [
    //   ...state.getIn(['paveList']),
    //   paveId
    // ]
  })

export const setCurrentDirectionId = (state, { directionId, waypointId }) =>
  state.merge({
    directionId,
    waypointId
  })

export const replace = (state, { directionId, newDirectionId }) => {
  const { directions = [], directionsList = [] } = state
  const newDirections = _.map(directions, direction => {
    const { id } = direction
    if (id === directionId) return { id: newDirectionId }
    return direction
  })

  return state.merge({
    directions: newDirections,
    directionstList: [
      directions,
      ...directionsList
    ]
  })
}

export const expand = (state, { index }) => {
  const { directions = [] } = state

  // expand given index of the directions
  const newDirections = _.flatMap(directions, (direction, directionIndex) => {
    if (directionIndex === index) {
      const { detailDirections = [] } = direction
      if (detailDirections.length > 0) {
        return _.map(detailDirections, (directionId, _index) => ({
          directionId
        }))
      }
    }

    return [direction]
  })

  return state.merge({
    directions: newDirections
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_PAVE_REQUEST]: createPaveRequest,
  [Types.CREATE_PAVE_SUCCESS]: createPaveSuccess,
  [Types.CREATE_PAVE_Failure]: createPaveFailure,

  [Types.CREATE_DIRECTION_REQUEST]: createDirectionRequest,
  [Types.CREATE_DIRECTION_SUCCESS]: createDirectionSuccess,
  [Types.CREATE_DIRECTION_FAILURE]: createDirectionFailure,

  [Types.OPEN_DIRECTIONS]: setCurrentDirections,
  [Types.OPEN_PAVE]: setCurrentPaveId,
  [Types.OPEN_DIRECTION]: setCurrentDirectionId,

  [Types.SET_DIRECTIONS]: setCurrentDirections,

  [Types.EXPAND_DIRECTION]: expand
})

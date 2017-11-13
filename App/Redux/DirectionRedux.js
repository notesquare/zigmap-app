import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getDirectionRequest: ['directionId'],
  getDirectionSuccess: ['directionId', 'data'],
  getDirectionFailure: ['directionId'],

  saveDirectionRequest: ['directionId'],
  saveDirectionSuccess: ['directionId'],
  saveDirectionFailure: ['directionId'],

  setDirection: ['directionId', 'data'],

  editDirectionRequest: ['directionId', 'data'],
  editDirectionSuccess: ['directionId'],
  editDirectionFailure: ['directionId']
})

export const DirectionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

export const INITIAL_DIRECTION_STATE = Immutable({
  fetching: null,
  fetchError: null,
  saved: null,
  saving: null,
  saveError: null,
  editing: null,
  editError: null,

  from: null,
  to: null,
  type: null,
  time: null,
  imageUrl: null,
  directionVector: null
})

/* ------------- Reducers ------------- */

export const getRequest = (state, { directionId }) =>
  state.setIn([directionId], {
    ...INITIAL_DIRECTION_STATE,
    fetching: true,
    fetchError: false
  })

export const getSuccess = (state, { directionId, data = {} }) =>
  state.setIn([directionId], {
    ...state.getIn([directionId]),
    ...data,
    fetching: false
  })

export const getFailure = (state, { directionId }) =>
  state.setIn([directionId], {
    ...state.getIn([directionId]),
    fetching: false,
    fetchError: true
  })

export const saveRequest = (state, { directionId }) =>
  state.setIn([directionId], {
    ...state.getIn([directionId]),
    saving: true,
    saveError: false
  })

export const saveSuccess = (state, { directionId }) =>
  state.setIn([directionId], {
    ...state.getIn([directionId]),
    saved: true,
    saving: false
  })

export const saveFailure = (state, { directionId }) =>
  state.setIn([directionId], {
    ...state.getIn([directionId]),
    saving: false,
    saveError: true
  })

export const set = (state, { directionId, data = {} }) =>
  state.setIn([directionId], {
    ...INITIAL_DIRECTION_STATE,
    ...data
  })

export const editRequest = (state, { directionId }) =>
  state.setIn([directionId], {
    ...state.getIn([directionId]),
    editing: true,
    editError: false
  })

export const editSuccess = (state, { directionId }) =>
  state.setIn([directionId], {
    ...state.getIn([directionId]),
    editing: false
  })

export const editFailure = (state, { directionId }) =>
  state.setIn([directionId], {
    ...state.getIn([directionId]),
    editing: false,
    editError: true
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DIRECTION_REQUEST]: getRequest,
  [Types.GET_DIRECTION_SUCCESS]: getSuccess,
  [Types.GET_DIRECTION_FAILURE]: getFailure,

  [Types.SAVE_DIRECTION_REQUEST]: saveRequest,
  [Types.SAVE_DIRECTION_SUCCESS]: saveSuccess,
  [Types.SAVE_DIRECTION_FAILURE]: saveFailure,

  [Types.SET_DIRECTION]: set,

  [Types.EDIT_DIRECTION_REQUEST]: editRequest,
  [Types.EDIT_DIRECTION_SUCCESS]: editSuccess,
  [Types.EDIT_DIRECTION_FAILURE]: editFailure
})

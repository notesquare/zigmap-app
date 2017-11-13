import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getPaveRequest: ['paveId'],
  getPaveSuccess: ['paveId', 'data'],
  getPaveFailure: ['paveId'],

  savePaveRequest: ['paveId'],
  savePaveSuccess: ['paveId'],
  savePaveFailure: ['paveId'],

  updatePaveRequest: ['paveId', 'update'],
  updatePaveSuccess: ['paveId', 'directions'],
  updatePaveFailure: ['paveId'],

  setPave: ['paveId', 'data'],

  editPaveRequest: ['paveId', 'data'],
  editPaveSuccess: ['paveId'],
  editPaveFailure: ['paveId']
})

export const PaveTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

export const INITIAL_PAVE_STATE = Immutable({
  fetching: null,
  fetchError: null,
  saved: null,
  saving: null,
  saveError: null,
  editing: null,
  editError: null,
  updating: null,
  updateError: null,

  from: null,
  to: null,
  directions: []
})

/* ------------- Reducers ------------- */

export const getRequest = (state, { paveId }) =>
  state.setIn([paveId], {
    ...INITIAL_PAVE_STATE,
    fetching: true,
    fetchError: false
  })

export const getSuccess = (state, { paveId, data }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    ...data,
    fetching: false
  })

export const getFailure = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    fetching: false,
    fetchError: true
  })

export const saveRequest = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    saving: true,
    saveError: false
  })

export const saveSuccess = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    saved: true,
    saving: true
  })

export const saveFailure = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    saving: false,
    saveError: true
  })

export const updateRequest = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    updating: true,
    updateError: false
  })

export const updateSuccess = (state, { paveId, directions = [] }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    updating: false,
    directions
  })

export const updateFailure = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    updating: false,
    updateError: true
  })

export const set = (state, { paveId, data }) =>
  state.setIn([paveId], {
    ...INITIAL_PAVE_STATE,
    ...data
  })

export const editRequest = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    editing: true,
    editError: false
  })

export const editSuccess = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    editing: false
  })

export const editFailure = (state, { paveId }) =>
  state.setIn([paveId], {
    ...state.getIn([paveId]),
    editing: false,
    editError: true
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PAVE_REQUEST]: getRequest,
  [Types.GET_PAVE_SUCCESS]: getSuccess,
  [Types.GET_PAVE_FAILURE]: getFailure,

  [Types.SAVE_PAVE_REQUEST]: saveRequest,
  [Types.SAVE_PAVE_SUCCESS]: saveSuccess,
  [Types.SAVE_PAVE_FAILURE]: saveFailure,

  [Types.UPDATE_PAVE_REQUEST]: updateRequest,
  [Types.UPDATE_PAVE_SUCCESS]: updateSuccess,
  [Types.UPDATE_PAVE_FAILURE]: updateFailure,

  [Types.SET_PAVE]: set,

  [Types.EDIT_PAVE_REQUEST]: editRequest,
  [Types.EDIT_PAVE_SUCCESS]: editSuccess,
  [Types.EDIT_PAVE_FAILURE]: editFailure
})

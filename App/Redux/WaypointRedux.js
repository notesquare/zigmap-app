import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getWaypointRequest: ['waypointId'],
  getWaypointSuccess: ['waypointId', 'data'],
  getWaypointFailure: ['waypointId'],

  saveWaypointRequest: ['waypointId'],
  saveWaypointSuccess: ['waypointId'],
  saveWaypointFailure: ['waypointId'],

  setWaypoint: ['waypointId', 'data']
})

export const WaypointTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

export const INITIAL_WAYPOINT_STATE = Immutable({
  fetched: null,
  fetching: null,
  fetchError: null,
  saved: null,
  saving: null,
  saveError: null,

  name: null,
  text: null,
  location: null,
  mapThumbnailUrl: null,
  type: null
})

/* ------------- Reducers ------------- */

export const getRequest = (state, { waypointId }) =>
  state.setIn([waypointId], {
    ...INITIAL_WAYPOINT_STATE,
    fetching: true,
    fetchError: false
  })

export const getSuccess = (state, { waypointId, data }) =>
  state.setIn([waypointId], {
    ...state.getIn([waypointId]),
    ...data,
    fetching: false,
    fetched: true
  })

export const getFailure = (state, { waypointId }) =>
  state.setIn([waypointId], {
    ...state.getIn([waypointId]),
    fetching: false,
    fetchError: true
  })

export const saveRequest = (state, { waypointId }) =>
  state.setIn([waypointId], {
    ...state.getIn([waypointId]),
    saving: true,
    saveError: false
  })

export const saveSuccess = (state, { waypointId }) =>
  state.setIn([waypointId], {
    ...state.getIn([waypointId]),
    saved: true,
    saving: false
  })

export const saveFailure = (state, { waypointId }) =>
  state.setIn([waypointId], {
    ...state.getIn([waypointId]),
    saved: false,
    saving: false,
    saveError: true
  })

export const set = (state, { waypointId, data }) =>
  state.setIn([waypointId], {
    ...INITIAL_WAYPOINT_STATE,
    ...data
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_WAYPOINT_REQUEST]: getRequest,
  [Types.GET_WAYPOINT_SUCCESS]: getSuccess,
  [Types.GET_WAYPOINT_FAILURE]: getFailure,

  [Types.SAVE_WAYPOINT_REQUEST]: saveRequest,
  [Types.SAVE_WAYPOINT_SUCCESS]: saveSuccess,
  [Types.SAVE_WAYPOINT_FAILURE]: saveFailure,

  [Types.SET_WAYPOINT]: set
})

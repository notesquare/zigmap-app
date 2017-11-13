import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchLocationsRequest: ['query'],
  searchLocationsSuccess: ['results'],
  searchLocationsFailure: null,

  searchRoutesRequest: ['from', 'to', 'filters'],
  searchRoutesSuccess: ['results'],
  searchRoutesFailure: null,

  setSearchData: ['data']
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  location: {},
  route: {}
})

export const INITIAL_LOCATION_STATE = Immutable({
  searching: null,
  searchError: null,
  query: null,
  results: null
})

export const INITIAL_ROUTE_STATE = Immutable({
  searching: null,
  searchError: null,
  from: {},
  to: {},
  filters: null,
  results: []
})
/* ------------- Reducers ------------- */

export const searchLocationsRequest = (state, { query }) =>
  state.setIn(['location'], {
    ...INITIAL_LOCATION_STATE,
    query,
    searching: true,
    searchError: false
  })

export const searchLocationsSuccess = (state, { locations = [] }) =>
  state.setIn(['location'], {
    ...state.getIn(['location']),
    searching: false,
    results: locations
  })

export const searchLocationsFailure = (state) =>
  state.setIn(['location'], {
    ...state.getIn(['location']),
    searching: false,
    searchError: true
  })

export const searchRoutesRequest = (state, { from, to, filters }) =>
  state.setIn(['route'], {
    ...INITIAL_ROUTE_STATE,
    from,
    to,
    filters,
    searching: true,
    searchError: false
  })

export const searchRoutesSuccess = (state, { results = [] }) =>
  state.setIn(['route'], {
    ...state.getIn(['route']),
    searching: false,
    results
  })

export const searchRoutesFailure = (state) =>
  state.setIn(['route'], {
    ...state.getIn(['route']),
    searching: false,
    searchError: true
  })

export const _setSearchData = (state, { data }) =>
  state.merge(data)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_LOCATIONS_REQUEST]: searchLocationsRequest,
  [Types.SEARCH_LOCATIONS_SUCCESS]: searchLocationsSuccess,
  [Types.SEARCH_LOCATIONS_FAILURE]: searchLocationsFailure,

  [Types.SEARCH_ROUTES_REQUEST]: searchRoutesRequest,
  [Types.SEARCH_ROUTES_SUCCESS]: searchRoutesSuccess,
  [Types.SEARCH_ROUTES_FAILURE]: searchRoutesFailure,

  // debug only
  [Types.SET_SEARCH_DATA]: _setSearchData
})

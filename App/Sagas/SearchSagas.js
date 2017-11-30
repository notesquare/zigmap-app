import { put, call } from 'redux-saga/effects'
import SearchActions from '../Redux/SearchRedux'

export const searchLocations = function * searchLocations (api, { query }) {
  const { data = {}, error } = yield call(api.searchLocations, query)
  if (error) {
    yield put(SearchActions.searchLocationsFailure())
    return
  }

  yield put(SearchActions.searchLocationsSuccess(data))
}

export const searchRoutes = function * searchRoutes (api, { from, to, filters = [] }) {
  const { data = {}, error } = yield call(api.searchRoutes, from, to, filters)
  if (error) {
    yield put(SearchActions.searchRoutesFailure())
    return
  }

  yield put(SearchActions.searchRoutesSuccess(data))
}

// TESTONLY
export const getSearchData = function * getSearchData (api, { searchId }) {
  const { data = {} } = yield call(api.getSearchResult, searchId)
  yield put(SearchActions.setSearchData({ route: data, searching: false }))
}

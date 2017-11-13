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

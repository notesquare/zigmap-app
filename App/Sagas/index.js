import { takeLatest, takeEvery, all, throttle } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { CurrentTypes } from '../Redux/CurrentRedux'
import { WaypointTypes } from '../Redux/WaypointRedux'
import { DirectionTypes } from '../Redux/DirectionRedux'
import { PaveTypes } from '../Redux/PaveRedux'
import { SearchTypes } from '../Redux/SearchRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { createNewPave, createNewDirection, openDirections, openPave, addEmptyDirection, removeDirection, saveRoute } from './CurrentSagas'
import { getWaypoint, saveWaypoint } from './WaypointSagas'
import { getDirection, saveDirection, editDirection } from './DirectionSagas'
import { getPave, savePave, updatePave, editPave } from './PaveSagas'
import { searchLocations, searchRoutes } from './SearchSagas'
/* ------------- API ------------- */

const api = DebugConfig.useFixtures ? FixtureAPI : API

/* ------------- Connect Types To Sagas ------------- */

const root = function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup, api),

    takeEvery(CurrentTypes.CREATE_PAVE_REQUEST, createNewPave, api),
    takeEvery(CurrentTypes.CREATE_DIRECTION_REQUEST, createNewDirection, api),
    takeLatest(CurrentTypes.OPEN_DIRECTIONS, openDirections, api),
    takeLatest(CurrentTypes.OPEN_PAVE, openPave, api),
    takeLatest(CurrentTypes.ADD_EMPTY_DIRECTION, addEmptyDirection, api),
    takeLatest(CurrentTypes.REMOVE_DIRECTION, removeDirection, api),
    takeLatest(CurrentTypes.SAVE_ROUTE, saveRoute, api),

    takeEvery(WaypointTypes.GET_WAYPOINT_REQUEST, getWaypoint, api),
    takeEvery(WaypointTypes.SAVE_WAYPOINT_REQUEST, saveWaypoint, api),

    takeEvery(DirectionTypes.GET_DIRECTION_REQUEST, getDirection, api),
    takeEvery(DirectionTypes.SAVE_DIRECTION_REQUEST, saveDirection, api),
    takeEvery(DirectionTypes.EDIT_DIRECTION_REQUEST, editDirection, api),

    takeEvery(PaveTypes.GET_PAVE_REQUEST, getPave, api),
    takeEvery(PaveTypes.SAVE_PAVE_REQUEST, savePave, api),
    takeEvery(PaveTypes.UPDATE_PAVE_REQUEST, updatePave, api),
    takeEvery(PaveTypes.EDIT_PAVE_REQUEST, editPave, api),

    takeLatest(SearchTypes.SEARCH_LOCATIONS_REQUEST, searchLocations, api),
    takeLatest(SearchTypes.SEARCH_ROUTES_REQUEST, searchRoutes, api)
  ])
}

export default root

import _ from 'lodash'

export default {
  loginAnonymously: () => {
    return Promise.resolve({})
  },
  getDirection: (directionId) => {
    const data = require('../Fixtures/directions.json')
    return Promise.resolve({ data: _.get(data, directionId, {}) })
  },
  getPave: (paveId) => {
    const data = require('../Fixtures/paves.json')
    return Promise.resolve({ data: _.get(data, paveId, {}) })
  },
  getWaypoint: (waypointId) => {
    const data = require('../Fixtures/waypoints.json')
    return Promise.resolve({ data: _.get(data, waypointId, {}) })
  },
  saveDirection: (directionId) => {
    return Promise.resolve({
    })
  },
  savePave: (paveId) => {
    return Promise.resolve({
    })
  },
  saveWaypoint: (waypointId) => {
    return Promise.resolve({
    })
  },
  search: (query) => {
    return Promise.resolve({
      results: require('../Fixtures/searchResults.json')
    })
  },
  // for debugging only
  _getDefaultData: () => {
    return Promise.resolve({
      data: require('../Fixtures/testData.json')
    })
  }
}

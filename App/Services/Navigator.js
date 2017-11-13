import _ from 'lodash'

let _container

function setContainer (container: Object) {
  _container = container
}

function dispatch (action) {
  _container.dispatch(action)
}

function getCurrentRouteName () {
  const index = _.get(_container.state, 'nav.index', -1)
  if (index < 0) return null
  return _.get(_container.state, `nav.routes[${index}].routeName`)
}

function getCurrent () {
  const { index, routes } = _.get(_container.state, 'nav', {})
  return routes[index]
}

export default {
  getCurrentRouteName,
  setContainer,
  getCurrent,
  dispatch
}

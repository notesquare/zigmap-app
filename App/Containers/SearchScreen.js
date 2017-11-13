import _ from 'lodash'
import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'

import RoundedButton from '../Components/RoundedButton'

// Actions
import SearchActions from '../Redux/SearchRedux'
import CurrentActions from '../Redux/CurrentRedux'

import styles from './Styles/SearchScreenStyle'

class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({ header: null })

  state = {
    fromQuery: null,
    toQuery: null,
    from: null,
    to: null,
    filters: null
  }

  handleSearch = () => {

  }

  handleSearchRoute = () => {
    const { from, to, filters = [] } = this.state
    const { searchRoutes } = this.props
    searchRoutes(from, to, filters)
  }

  handleOpenDirections = (directions = []) => {
    const { openDirections } = this.props
    openDirections(directions)
  }

  handleNewPave = () => {
    // create an empty pave
    const { openPave } = this.props
    openPave()
  }

  render () {
    const {
      routeFrom = '',
      routeTo = '',
      // locationSearching,
      // locationSearchError,
      // locationSearchResults,
      // routeSearching,
      // routeSearchError,
      routeSearchResults
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.fromContainer}>
            <Text>FROM: <Text>{routeFrom}</Text></Text>
          </View>
          <View style={styles.toContainer}>
            <Text>TO: <Text>{routeTo}</Text></Text>
          </View>
          <View style={styles.filterContainer}>
            <Text>FILTER HERE@</Text>
          </View>
          <RoundedButton text='Search' onPress={this.handleSearch} />
        </View>
        <ScrollView style={styles.resultsContainer}>
          {routeSearchResults && (
            _.map(routeSearchResults, ({ directions = [] }, index) => (
              <RoundedButton
                key={index}
                text={`${index}`}
                onPress={() => this.handleOpenDirections(directions)}
              />
            ))
          )}
        </ScrollView>
        <View style={styles.controlContainer}>
          <RoundedButton
            text='PAVE +'
            onPress={() => this.handleNewPave()}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { waypoint = {}, search = {} } = state
  const { location = {}, route = {} } = search
  const {
    searching: locationSearching,
    searchError: locationSearchError,
    results: locationSearchResults
  } = location
  const {
    from = {},
    to = {},
    searching: routeSearching,
    searchError: routeSearchError,
    results: routeSearchResults
  } = route

  let fromName = null
  let toName = null
  if (from.type === 'waypoint') {
    const { name } = _.get(waypoint, from.id, {})
    fromName = name
  }
  if (to.type === 'waypoint') {
    const { name } = _.get(waypoint, to.id, {})
    toName = name
  }

  return {
    locationSearching,
    locationSearchError,
    locationSearchResults,
    routeFrom: fromName,
    routeTo: toName,
    routeSearching,
    routeSearchError,
    routeSearchResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchLocation: (query) => dispatch(SearchActions.searchLocationsRequest(query)),
    searchRoutes: (from, to, filters) => dispatch(SearchActions.searchRoutesRequest(from, to, filters)),
    openDirections: (directions) => dispatch(CurrentActions.openDirections(directions)),
    openPave: (paveId) => dispatch(CurrentActions.openPave(paveId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)

import _ from 'lodash'
import React from 'react'
import { View, Text, FlatList, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import Dash from 'react-native-dash'

import { Colors, Images } from '../Themes'

import DemoPopup from '../Components/DemoPopup'
import SelectButton from '../Components/SelectButton'
import SearchResultItem from '../Components/SearchResultItem'
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

  handleReset = () => {
    const { resetSearch } = this.props
    resetSearch()
  }

  handleDemoScreen = () => {
    if (this.popupDialog && this.popupDialog.ref) {
      this.popupDialog.ref.show()
    }
  }

  handleSearchSelect = (key) => {
    const { getSearchData } = this.props
    // console.log(_data[key])
    getSearchData(key)
    // getSearchData({route: _data[key]})
  }

  renderSearchResultItem = ({item = {}, index}) => {
    const { directions = [], price, type, co2 } = item
    // 1. calculate entire time
    const totalTime = _.reduce(directions, (acc, {time = 1}) => (
      acc += time
    ), 0)

    // 2. combine all time with sections
    // caveat: subway-transfor is same as walk
    const methods = _.chain(directions)
      .map(direction => {
        if (direction.type === 'subway-transfer') {
          return {...direction, type: 'walk'}
        }
        return direction
      })
      .groupBy('type')
      .map((items = [], key) => ({
        type: key,
        time: _.sumBy(items, 'time')
      }))
      .value()

    // const methods = [
    //   {type: 'walk', time: 10},
    //   {type: 'subway', time: 20},
    //   {type: 'bus', time: 13}
    // ]
    return (
      <SearchResultItem
        type={type}
        price={price.toLocaleString('ko')}
        co2={co2.toLocaleString('ko')}
        onPress={() => this.handleOpenDirections(directions)}
        methods={methods}
        totalTime={totalTime}
      />
    )
  }

  render () {
    const {
      routeFrom = '',
      routeTo = '',
      // locationSearching,
      // locationSearchError,
      // locationSearchResults,
      routeSearching,
      // routeSearchError,
      routeSearchResults = [],
      _items
    } = this.props

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.searchContainer}>
          <View style={styles.locationContainer}>
            <View style={styles.timelineContainer}>
              <Feather name='disc' style={styles.startIcon} />
            </View>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={this.handleDemoScreen}
            >
              <View style={styles.startInputBox}>
                {routeFrom ? (
                  <Text style={styles.inputText}>{routeFrom}</Text>
                ) : (
                  <Text style={styles.inputTextLow}>출발지</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.timelineContainer}>
              <Dash
                style={styles.timeline}
                dashThickness={3}
                dashLength={4}
                dashGap={2}
                dashColor={Colors.point1}
              />
            </View>
            <ScrollView horizontal style={styles.travelModesContainer}>
              <SelectButton
                style={styles.travelModeContainer}
                text='최소 비용'
              />
              <SelectButton
                style={styles.travelModeContainer}
                text='나눔카 우선'
              />
              <SelectButton
                style={styles.travelModeContainer}
                text='따릉이 우선'
              />
              <SelectButton
                style={styles.travelModeContainer}
                text='도보 최소'
              />
            </ScrollView>
          </View>
          <View style={styles.locationContainer}>
            <View style={styles.timelineContainer}>
              <Feather name='map-pin' style={styles.finishIcon} />
            </View>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={this.handleDemoScreen}
            >
              <View style={styles.finishInputBox}>
                {routeTo ? (
                  <Text style={styles.inputText}>{routeTo}</Text>
                ) : (
                  <Text style={styles.inputTextLow}>도착지</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <ScrollView style={styles.resultsContainer}>
          {routeSearchResults && (
            _.map(routeSearchResults, ({ directions = [] }, index) => (
              <RoundedButton
                key={index}
                text={`${index}`}
                onPress={() => this.handleOpenDirections(directions)}
              />
            ))
          )}
        </ScrollView> */}
        <View style={styles.mainContainer}>
          {routeSearching ? (
            <ActivityIndicator size='large' />
          ) : (
            routeSearchResults.length > 0 ? ([
              <FlatList
                key='flatlist'
                style={styles.resultsContainer}
                renderItem={this.renderSearchResultItem}
                data={routeSearchResults}
                // renderSectionHeader={this.renderSectionHeader}
                // sections={directions}
                keyExtractor={(item, index) => index}
                ListFooterComponent={<View style={{height: 100}} />}
              />,
              <View key='button1' style={styles.bottomContainer}>
                <RoundedButton
                  text='검색결과 초기화'
                  onPress={() => this.handleReset()}
                />
              </View>
            ]) : (
              <View style={styles.controlContainer}>
                {/* <RoundedButton text='Search' onPress={this.handleSearch} /> */}
                <View style={styles.disclaimerContainer}>
                  <Image source={Images.disclaimer} style={styles.disclaimerImage} />
                </View>
                <RoundedButton
                  text='길 개척하기 &#945;'
                  onPress={() => this.handleDemoScreen()}
                />
              </View>
            )
          )}
        </View>
        <DemoPopup
          ref={ref => { this.popupDialog = ref }}
          style={styles.popupContainer}
          onSelect={this.handleSearchSelect}
          items={_items}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { search = {} } = state
  const { location = {}, route = {} } = search
  const {
    searching: locationSearching,
    searchError: locationSearchError,
    results: locationSearchResults
  } = location
  const {
    from: { name: routeFrom } = {},
    to: { name: routeTo } = {},
    searching: routeSearching,
    searchError: routeSearchError,
    results: routeSearchResults
  } = route

  // debug only
  const { _debug = [] } = search

  return {
    locationSearching,
    locationSearchError,
    locationSearchResults,
    routeFrom,
    routeTo,
    routeSearching,
    routeSearchError,
    routeSearchResults,
    _items: _debug
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchLocation: (query) => dispatch(SearchActions.searchLocationsRequest(query)),
    searchRoutes: (from, to, filters) => dispatch(SearchActions.searchRoutesRequest(from, to, filters)),
    openDirections: (directions) => dispatch(CurrentActions.openDirections(directions)),
    openPave: (paveId) => dispatch(CurrentActions.openPave(paveId)),
    resetSearch: () => dispatch(SearchActions.resetSearch()),
    getSearchData: (searchId) => dispatch(SearchActions.getSearchData(searchId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)

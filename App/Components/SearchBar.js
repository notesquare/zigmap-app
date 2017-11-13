import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import styles from './Styles/SearchBarStyles'
import { Colors, Metrics } from '../Themes/'

export default class SearchBar extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    searchTerm: PropTypes.string
  }

  render () {
    const { onSearch, onCancel, searchTerm } = this.props
    const onSubmitEditing = () => onSearch(searchTerm)
    return (
      <View style={styles.container}>
        <Ionicons name='ios-search' size={Metrics.icons.tiny} style={styles.searchIcon} />
        <TextInput
          ref='searchText'
          autoFocus
          placeholder='Search'
          placeholderTextColor={Colors.snow}
          underlineColorAndroid='transparent'
          style={styles.searchInput}
          value={this.props.searchTerm}
          onChangeText={onSearch}
          autoCapitalize='none'
          onSubmitEditing={onSubmitEditing}
          returnKeyType={'search'}
          autoCorrect={false}
          selectionColor={Colors.snow}
        />
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

import _ from 'lodash'
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import Strings from '../Fixtures/strings.json'
import styles from './Styles/TagsStyles'

export default class Tags extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onPressTag: PropTypes.func
  }

  handlePressTag = (tag) => {
    const { onPressTag } = this.props
    if (onPressTag) {
      onPressTag(tag)
    }
  }

  render () {
    const { data = [] } = this.props
    // NOTICE
    // tag type special should be combined into one
    let items = []
    let specialTagData = []
    _.map(data, (item = {}, index) => {
      if (item.type === 'special') {
        specialTagData.push(item)
      } else {
        items.push(item)
      }
    })
    if (!_.isEmpty(specialTagData)) {
      items.push({type: 'special', name: Strings.SPECIAL_TAG, data: specialTagData})
    }

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tagScroll}
        >
          <View style={styles.preTag} />
          {_.map(items, (item = {}, index) =>
            // <View key={index} style={styles.tag}>
            //   <Text style={styles.tagText}>#{item}</Text>
            // </View>
            item.type === 'special' ? (
              <TouchableOpacity key={index} style={styles.specialTag} onPress={() => this.handlePressTag(item)}>
                <Text style={styles.specialTagText}>{item.name}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity key={index} style={styles.tag} onPress={() => this.handlePressTag(item)}>
                <Text style={styles.tagText}>#{item.name}</Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { Images, Colors } from '../Themes'
import DirectionPicture from '../Components/DirectionPicture'
import TravelMode from '../Components/TravelMode'
import styles from './Styles/DirectionItemStyles'

export default class DirectionItem extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    mapThumbnailUrl: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    location: PropTypes.object,
    traffic: PropTypes.number,
    noOfDetailDirections: PropTypes.number,
    enterEdit: PropTypes.func,
    openCurrentMap: PropTypes.func,
    directionPoints: PropTypes.array,
    onEdit: PropTypes.func,
    isCurrent: PropTypes.bool,
    isEditing: PropTypes.bool,
    hideName: PropTypes.bool,
    onPress: PropTypes.func,
    onExpand: PropTypes.func
  }

  state = {
    edited: false,
    image: null,
    expanded: false
  }

  handlePressMore = () => {
    const { onExpand } = this.props
    onExpand()
    // this.setState(state => ({
    //   ...state,
    //   expanded: !state.expanded
    // }))
  }

  renderButton = () => {
    const { type } = this.props
    if (type === 'nanumcar') {
      return (
        <View style={[styles.buttonContainer, {backgroundColor: Colors.point2}]}>
          <Image source={Images.nanumcar} style={styles.rightImage} />
        </View>
      )
    }
    return (
      <View style={styles.buttonContainer}>
        <Feather name='chevron-right' style={styles.rightButton} />
      </View>
    )
  }

  render () {
    const {
      imageUrl,
      name,
      isEditing,
      onPress,
      hideName = false,
      traffic,
      type,
      time,
      directionPoints = [],
      noOfDetailDirections = 0
    } = this.props
    if (isEditing) {
      return this.renderInEdit()
    }

    return (
      <View style={styles.container} onPress={onPress}>
        <View style={styles.topContainer}>
          {/* <View style={styles.timelineContainer}>
            <Timeline
              showDot={!hideName || !!imageUrl}
            />
          </View> */}
          <View style={styles.mainContainer}>
            {(!hideName || !!imageUrl) && (
              <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
                <View style={styles.leftContainer}>
                  {!hideName && name && (
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>{name}</Text>
                    </View>
                  )}
                  {!!imageUrl && (
                    <View style={styles.imageContainer}>
                      <DirectionPicture
                        source={{uri: imageUrl}}
                        style={styles.image}
                        points={directionPoints}
                      />
                    </View>
                  )}
                </View>
                {this.renderButton()}
              </TouchableOpacity>
            )}
            <TravelMode
              mode={type}
              time={time}
              traffic={traffic}
              noOfDetailDirections={noOfDetailDirections}
              onPressMore={this.handlePressMore}
            />
          </View>
        </View>
      </View>
    )
  }
}

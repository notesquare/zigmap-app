import React from 'react'
import { ViewPropTypes, View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog'

import RoundedButton from '../Components/RoundedButton'

import styles from './Styles/DemoPopupStyles'

export default class DemoPopup extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    onSelect: PropTypes.func,
    items: PropTypes.array
  }

  handlePress = (key) => {
    const { onSelect } = this.props
    onSelect(key)
    this.ref.dismiss()
  }

  renderItem = ({item = {}, index}) => {
    const { text, id } = item
    return (
      <RoundedButton text={text} onPress={() => this.handlePress(id)} />
    )
  }

  render () {
    const { items = [], style = {} } = this.props

    return (
      <PopupDialog
        ref={ref => { this.ref = ref }}
        dialogStyle={style}
        dialogTitle={<DialogTitle title='경로 설정 (&#945; 테스트)' />}
        actions={[]}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.text}>
            제한적인 기능만 사용할 수 있습니다.
          </Text>
          <Text style={styles.text}>
            아래의 미리 설정된 주소를 클릭해서 찍맵의 길찾기 기능을 경험해 보세요.
          </Text>
          <FlatList
            style={styles.buttonContainer}
            renderItem={this.renderItem}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
            data={items}
            keyExtractor={(item, index) => index}
          />
        </View>
      </PopupDialog>
    )
  }
}

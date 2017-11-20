import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TouchableHighlight, Text, Image } from 'react-native';

import styles from 'app/components/ContentEditListItem/ContentEditListItemStyles';

class ContentEditListItem extends Component {

  constructor(props) {
    super(props);

    this.handleItemPress = this.handleItemPress.bind(this);
  }

  handleItemPress() {
    this.props.onItemPress(this.props.item);
  }

  render() {
    // TODO: Remove that when empty listview problem is solved
    if (this.props.item.name === 'badHack') {
      return <View/>;
    } else {
      return (
        <TouchableHighlight onPress={this.handleItemPress}>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle} numberOfLines={1}>{this.props.item.name}</Text>
            <View style={styles.listItemRight}>
            {this.props.item.selected ?
              <Image
                source={require('app/images/img_checkmark.png')}
                style={styles.listItemCheckedIcon}
              /> : null
            }
            </View>
          </View>
        </TouchableHighlight>
      );
    }
  }
}

ContentEditListItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  onItemPress: PropTypes.func,
};

export default ContentEditListItem;

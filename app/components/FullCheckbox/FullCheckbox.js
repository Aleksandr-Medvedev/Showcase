/**
 * Created by Aleksandr_Medvedev on 7/19/17.
 */

import React from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import Colors from 'app/styles/Colors';

import FullCheckboxStyle from './FullCheckboxStyle';

class FullCheckbox extends React.Component {

  // ========================================== //
  // Updating
  // ========================================== //

  render() {
    let style;
    if (this.props.style) {
      if (Array.isArray(this.props.style)) {
        style = this.props.style.slice();
        style.unshift(FullCheckboxStyle.containerCheckbox);
      } else {
        style = [FullCheckboxStyle.containerCheckbox, this.props.style];
      }
    } else {
      style = FullCheckboxStyle.containerCheckbox;
    }

    return (
      <TouchableHighlight
        onPress={() => this.props.onToggle()}
        underlayColor={Colors.lightGrayHighlight}
      >
        <View
          style={style}>
          {this.props.checked ? <View style={FullCheckboxStyle.fulfillment}/> : null}
        </View>
      </TouchableHighlight>
    );
  }

  // ========================================== //
  // Actions
  // ========================================== //

  toggle() {
    this.props.onToggle(!this.props.checked);
  }
}

FullCheckbox.propTypes = {
  style: View.propTypes.style,
  checked: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default FullCheckbox;

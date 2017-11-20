/**
 * Created by Aleksandr_Medvedev on 7/27/17.
 */

import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import Colors from 'app/styles/Colors';
import GeneralStyle from 'app/styles/GeneralStyles';
import SettingsRowStyle from './SettingsRowStyles';

class SettingsRow extends React.Component {

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    return <TouchableHighlight
      underlayColor={Colors.materialTextSecondary}
      onPress={this.props.onPress}
    >
      <View
        style={SettingsRowStyle.container}
        {...this.props}
      >
        <Text style={GeneralStyle.textBodyTwo}>{this.props.textDescription}</Text>
        <Image
          style={SettingsRowStyle.accessibilityIdentifier}
          source={require('app/images/ic_action_ic_keyboard_arrow_right_black.png')}
        />
      </View>
    </TouchableHighlight>;
  }
}

SettingsRow.propTypes = {
  ...View.propTypes,
  textDescription: PropTypes.string,
  onClick: PropTypes.func,
  onPress: TouchableHighlight.propTypes.onPress,
};

export default SettingsRow;

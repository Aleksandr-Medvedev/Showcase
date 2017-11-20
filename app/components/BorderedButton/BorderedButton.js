/**
 * Created by Aleksandr_Medvedev on 5/5/17.
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from 'app/styles/GeneralStyles';
import localStyles from './BorderedButtonStyles';

class BorderedButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={[globalStyles.textBodyOne, localStyles.title, this.props.textStyle]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

BorderedButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  textStyle: PropTypes.number,
};

export default BorderedButton;

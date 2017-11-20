/**
 * Created by Aleksandr_Medvedev on 7/31/17.
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import getMixedStyle from 'app/utils/getMixedStyle';
import GeneralStyles from 'app/styles/GeneralStyles';
import ButtonWithIconStyles from './ButtonWithIconStyles';

class ButtonWithIcon extends React.Component {

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    const buttonStyle = getMixedStyle(this.props.style, ButtonWithIconStyles.containerTouchable);

    let textStyle = [GeneralStyles.textBodyTwo, ButtonWithIconStyles.title];
    textStyle = getMixedStyle(this.props.textStyle, textStyle);

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={buttonStyle}
        activeOpacity={0.8}
      >
        <View
          {...this.props}
          style={[GeneralStyles.containerHorizontallyCentered, ButtonWithIconStyles.containerView]}
        >
          {this.props.icon ?
          <Image source={this.props.icon} style={ButtonWithIconStyles.icon}/> : <View/>}
          <Text style={textStyle}>
            {this.props.title}
          </Text>
          <View/>
        </View>
      </TouchableOpacity>
    );
  }
}

ButtonWithIcon.propTypes = {
  ...View.propTypes,
  icon: Image.propTypes.source,
  title: PropTypes.string,
  textStyle: Text.propTypes.style,
  onPress: TouchableOpacity.propTypes.onPress,
};

export default ButtonWithIcon;

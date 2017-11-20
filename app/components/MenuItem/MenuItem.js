/**
 * Created by Aleksandr_Medvedev on 5/5/17.
 */

import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import getMixedStyle from 'app/utils/getMixedStyle';
import GeneralStyles from 'app/styles/GeneralStyles';
import MenuItemStyles from './MenuItemStyles';

function MenuItem(props) {
  if (props.hidden) {
    return <View/>;
  } else {
    const titleStyle = getMixedStyle(
      props.style,
      [GeneralStyles.textSubheading, MenuItemStyles.title],
    );
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={MenuItemStyles.container}>
          <Image style={MenuItemStyles.icon} source={props.icon}/>
          <Text style={titleStyle}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

MenuItem.propTypes = {
  icon: Image.propTypes.source.isRequired,
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.number,
  hidden: PropTypes.bool,
};

export default MenuItem;

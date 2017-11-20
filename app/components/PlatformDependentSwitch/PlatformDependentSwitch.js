/**
 * Created by Aleksandr_Medvedev on 8/25/17.
 */

import React from 'react';
import {
  Switch,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import Colors from 'app/styles/Colors';
import PlatformDependentSwitchStyles from './PlatformDependentSwitchStyles';

class PlatformDependentSwitch extends Switch {

  static propTypes = {
    ...Switch.propTypes,
    onThumbTintColor: PropTypes.string,
    offThumbTintColor: PropTypes.string,
  };

  static defaultProps = {
    ...Switch.defaultProps,
    ...Platform.select({
      ios: {
        onTintColor: Colors.blue,
        style: PlatformDependentSwitchStyles.style,
      },
      android: {
        tintColor: Colors.gray,
        onTintColor: Colors.blue,
        onThumbTintColor: Colors.darkBlue,
        offThumbTintColor: Colors.white,
      },
    }),
  };

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    if (Platform.OS === 'ios') {
      return <Switch {...this.props}/>;
    } else {
      const androidThumbTintColor =
        this.props.value ? this.props.onThumbTintColor : this.props.offThumbTintColor;
      return <Switch
        {...this.props}
        thumbTintColor={this.props.thumbTintColor || androidThumbTintColor}
      />;
    }
  }

}

export default PlatformDependentSwitch;

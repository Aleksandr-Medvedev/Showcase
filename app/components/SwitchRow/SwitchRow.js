import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from 'app/components/SwitchRow/SwitchRowStyles';
import GeneralStyle from 'app/styles/GeneralStyles';
import PropTypes from 'prop-types';

import PlatformDependentSwitch from
  'app/components/PlatformDependentSwitch/PlatformDependentSwitch';

class SwitchRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[GeneralStyle.textBodyTwo, styles.description]}>
          {this.props.textDescription}
        </Text>
        <PlatformDependentSwitch
          onValueChange={this.props.onEvent}
          value={this.props.value}
        />
      </View>
    );
  }

}

SwitchRow.propTypes = {
  textDescription: PropTypes.string,
  onEvent: PropTypes.func,
  value: PropTypes.bool,
};

export default SwitchRow;

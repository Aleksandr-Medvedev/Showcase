/**
 * Created by Aleksandr_Medvedev on 5/4/17.
 */

import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

class Checkbox extends Component {

  // ========================================== //
  // Mounting
  // ========================================== //

  constructor(props) {
    super(props);
    this.onToggle = this.toggle.bind(this);
  }

  // ========================================== //
  // Updating
  // ========================================== //

  render() {
    const image = this.props.checked ?
      require('app/images/checked.png') :
      require('app/images/unchecked.png');
    return (
      <TouchableWithoutFeedback onPress={this.onToggle}>
        <Image source={image} />
      </TouchableWithoutFeedback>
    );
  }

  // ========================================== //
  // Actions
  // ========================================== //

  toggle() {
    this.props.onToggle(!this.props.checked);
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default Checkbox;

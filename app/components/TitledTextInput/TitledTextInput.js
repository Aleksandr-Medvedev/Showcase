/**
 * Created by Aleksandr_Medvedev on 6/7/17.
 */

import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import GeneralStyles from 'app/styles/GeneralStyles';
import TitledTextInputStyles from './TitledTextInputStyles';

class TitledTextInput extends React.Component {

  // ========================================== //
  // Actions
  // ========================================== //

  focus() {
    this.textInput.focus();
  }

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    return (
      <View
        style={this.props.style}
      >
        <Text style={[GeneralStyles.textCaption]}>
          {this.props.title}
          {this.props.isMandatory ?
            <Text style={TitledTextInputStyles.textMandatory}> *</Text> :
            null}
        </Text>
        <TextInput
          ref={textInput => this.textInput = textInput}
          {...this.props}
          style={
            [GeneralStyles.textInput, TitledTextInputStyles.textInput, this.props.textInputStyles]
          }
        />
        {this.props.informationText ?
          <Text style={GeneralStyles.textCaption}>{this.props.informationText}</Text> :
          null}
      </View>
    );
  }
}

TitledTextInput.propTypes = {
  ...TextInput.propTypes,
  isMandatory: PropTypes.bool,
  informationText: PropTypes.string,
  title: PropTypes.string.isRequired,
  style: View.propTypes.style,
  textInputStyles: TextInput.propTypes.style,
};

export default TitledTextInput;

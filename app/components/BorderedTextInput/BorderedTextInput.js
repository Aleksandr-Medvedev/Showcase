/**
 * Created by Aleksandr_Medvedev on 9/25/17.
 */

import React from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import getMixedStyle from 'app/utils/getMixedStyle';
import GeneralStyle from 'app/styles/GeneralStyles';
import BorderedTextInputStyle from './BorderedTextInputStyle';

class BorderedTextInput extends React.Component {

  focus() {
    this.textInput.focus();
  }

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    const containerStyles = getMixedStyle(
      this.props.containerStyle, BorderedTextInputStyle.containerInput
    );
    const textInputStyle = getMixedStyle(
      this.props.style, GeneralStyle.textInput,
    );
    return <View style={containerStyles}>
      <TextInput
        ref={textInput => this.textInput = textInput}
        {...this.props}
        style={textInputStyle}
      />
    </View>;
  }
}

BorderedTextInput.propTypes = {
  ...TextInput.propTypes,
  containerStyle: View.propTypes.style,
};

export default BorderedTextInput;

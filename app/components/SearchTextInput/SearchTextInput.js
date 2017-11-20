/**
 * Created by Aleksandr_Medvedev on 8/28/17.
 */

import React from 'react';

import {
  View,
  TextInput,
  Image,
} from 'react-native';

import getMixedStyle from 'app/utils/getMixedStyle';
import Colors from 'app/styles/Colors';
import SearchTextInputStyles from './SearchTextInputStyles';

class SearchTextInput extends React.Component {

  static propTypes = {
    ...TextInput.propTypes,
    containerStyle: View.propTypes.style,
  };

  static defaultProps = {
    returnKeyType: 'done',
    placeholder: 'Search',
    underlineColorAndroid: Colors.transparent,
  };

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    const containerStyle = getMixedStyle(
      this.props.containerStyle,
      SearchTextInputStyles.containerSearch,
    );

    const style = getMixedStyle(
      this.props.style,
      SearchTextInputStyles.textInputSearch,
    );

    return <View style={containerStyle}>
      <View style={SearchTextInputStyles.containerSearchBorder}>
        <Image
          style={SearchTextInputStyles.imageSearch}
          source={require('app/images/ic_search.png')}
        />
        <TextInput
          {...this.props}
          style={style}
        />
      </View>
    </View>;
  }
}

export default SearchTextInput;

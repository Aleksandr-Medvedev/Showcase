/**
 * Created by Aleksandr_Medvedev on 8/16/17.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import Colors from 'app/styles/Colors';
import GeneralStyle from 'app/styles/GeneralStyles';
import CheckableListRowStyles from './CheckableListRowStyles';

class CheckableListRow extends React.Component {

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    const containerStyle = this.props.isHighlighted ?
      [CheckableListRowStyles.container, CheckableListRowStyles.containerChecked] :
      CheckableListRowStyles.container;
    return <TouchableHighlight
      onPress={() => this.props.onPress(this.props.data)}
      delayLongPress={3000}
      style={CheckableListRowStyles.containerTouchable}
      underlayColor={Colors.materialDividers}
    >
      <View
        style={containerStyle}
        {...this.props}
      >
        <Text ellipsizeMode="tail" numberOfLines={1} style={GeneralStyle.textBodyOne}>
          {this.props.data[this.props.textProperty]}
        </Text>
        {this.props.isHighlighted ?
          <Image
            source={require('app/images/img_checkmark.png')}
            style={CheckableListRowStyles.imageCheckmark}
          /> : null}
      </View>
    </TouchableHighlight>;
  }
}

CheckableListRow.propTypes = {
  ...View.propTypes,
  onPress: PropTypes.func,
  isHighlighted: PropTypes.bool,
  textProperty: PropTypes.string,
  data: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default CheckableListRow;

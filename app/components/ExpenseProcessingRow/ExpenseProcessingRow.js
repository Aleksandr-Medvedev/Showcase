/**
 * Created by Aleksandr_Medvedev on 8/22/17.
 */

import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import GeneralStyle from 'app/styles/GeneralStyles';
import ExpenseProcessingRowStyles from './ExpenseProcessingRowStyles';

class ExpenseProcessingRow extends React.Component {

  // ========================================== //
  // Render
  // ========================================== //

  render() {

    return <View style={ExpenseProcessingRowStyles.container}>
      <Image
        style={ExpenseProcessingRowStyles.icon}
        source={require('app/images/processing.png')}
      />
      <Text
        style={GeneralStyle.textBodyOne}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        Processing
      </Text>
    </View>;
  }
}

ExpenseProcessingRow.propTypes = {
  data: PropTypes.string,
};

export default ExpenseProcessingRow;

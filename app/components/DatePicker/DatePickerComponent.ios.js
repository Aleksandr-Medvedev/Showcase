/**
 * Created by Aleksandr_Medvedev on 8/30/17.
 */

import React from 'react';
import {
  View,
  DatePickerIOS,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import GeneralStyles from 'app/styles/GeneralStyles';
import DatePickerComponentStyles from './DatePickerComponentStyles';

class DatePickerComponent extends React.Component {

  static propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateSelected: PropTypes.func,
  };

  // ========================================== //
  // Lifecycle
  // ========================================== //

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.date || new Date(),
    };
    this.textStyle = [GeneralStyles.textSubheading, DatePickerComponentStyles.textButton];
    this.handleOnDateChange = this.handleOnDateChange.bind(this);
    this.handleOnDone = this.handleOnDone.bind(this);
  }

  // ========================================== //
  // Actions
  // ========================================== //

  handleOnDateChange(date) {
    this.setState({ selectedDate: date });
  }

  handleOnDone() {
    this.props.onDateSelected(this.state.selectedDate);
    Actions.pop();
  }

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    return <Modal
      animationType="fade"
      transparent
    >
      <View style={DatePickerComponentStyles.container}>
        <View/>
        <View style={DatePickerComponentStyles.containerPicker}>
          <View style={DatePickerComponentStyles.containerCameraToolbar}>
            <TouchableOpacity onPress={Actions.pop}>
              <Text style={this.textStyle}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleOnDone}>
              <Text style={this.textStyle}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <DatePickerIOS
            date={this.state.selectedDate}
            onDateChange={this.handleOnDateChange}
            timeZoneOffsetInMinutes={0}
            mode="date"
          />
        </View>
      </View>
    </Modal>;
  }

}

export default DatePickerComponent;

/**
 * Created by Aleksandr_Medvedev on 8/30/17.
 */

import {
  DatePickerAndroid,
} from 'react-native';

class DatePicker {

  // ========================================== //
  // Lifecycle
  // ========================================== //

  constructor(params, onDateSelected) {
    params.date += new Date().getTimezoneOffset() * 60 * 1000;
    this.params = params;
    this.onDateSelected = onDateSelected;
  }

  // ========================================== //
  // Actions
  // ========================================== //

  open() {
    DatePickerAndroid.open(this.params)
      .then(event => {
        if (event.action === DatePickerAndroid.dateSetAction) {
          this.onDateSelected(new Date(event.year, event.month, event.day));
        }
      })
      .catch(error => console.warn(error));
  }

}

export default DatePicker;

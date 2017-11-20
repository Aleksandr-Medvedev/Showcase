/**
 * Created by Aleksandr_Medvedev on 8/30/17.
 */

import { Actions } from 'react-native-router-flux';

class DatePicker {

  // ========================================== //
  // Lifecycle
  // ========================================== //

  constructor(params, onDateSelected) {
    this.params = params;
    this.onDateSelected = onDateSelected;
  }

  // ========================================== //
  // Actions
  // ========================================== //

  open() {
    Actions.datePicker({
      date: new Date(this.params.date),
      onDateSelected: this.onDateSelected,
    });
  }

}

export default DatePicker;

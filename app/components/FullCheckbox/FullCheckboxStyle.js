/**
 * Created by Aleksandr_Medvedev on 7/19/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  containerCheckbox: {
    width: 24,
    height: 24,
    padding: 2,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: Colors.materialAccentIndigoA700,
    alignItems: 'stretch',
  },
  fulfillment: {
    backgroundColor: Colors.materialAccentIndigoA700,
    flex: 1,
    borderRadius: 2,
  },
});

/**
 * Created by Aleksandr_Medvedev on 6/7/17.
 */

import { StyleSheet } from 'react-native';

import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: Colors.materialTextSecondary,
    color: Colors.materialTextPrimary,
  },
  textMandatory: {
    color: Colors.materialAccentRedA700,
  },
});


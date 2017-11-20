/**
 * Created by Aleksandr_Medvedev on 7/31/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  containerView: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  containerTouchable: {
    backgroundColor: Colors.materialAccentBlueA400,
    justifyContent: 'center',
    borderWidth: 0,
    borderStyle: 'solid',
    borderRadius: 6,
    padding: 6,
    minWidth: 128,
    minHeight: 36,
  },
  title: {
    color: Colors.materialTextPrimaryInverse,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

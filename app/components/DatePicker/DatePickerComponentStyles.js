/**
 * Created by Aleksandr_Medvedev on 8/30/17.
 */

import { StyleSheet } from 'react-native';

import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.materialTextSecondary,
    justifyContent: 'space-between',
  },
  containerPicker: {
    backgroundColor: Colors.white,
  },
  containerCameraToolbar: {
    height: 54,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  textButton: {
    color: Colors.materialTextPrimaryInverse,
    padding: 4,
  },
});

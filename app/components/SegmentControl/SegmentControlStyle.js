/**
 * Created by Aleksandr_Medvedev on 7/18/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  item: {
    minWidth: 64,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.materialAccentGreenA700,
  },
  itemSelected: {
    backgroundColor: Colors.materialAccentGreenA700,
  },
  itemDefault: {
    backgroundColor: Colors.transparent,
  },
  itemLeft: {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  itemRight: {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  text: {
    textAlign: 'center',
  },
  textSelected: {
    color: Colors.materialTextPrimaryInverse,
  },
  textDefault: {
    color: Colors.materialAccentGreenA700,
  },
});

/**
 * Created by Aleksandr_Medvedev on 5/5/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
    color: Colors.materialTextPrimaryInverse,
  },
  icon: {
    width: 22,
    height: 22,
    padding: 2,
    resizeMode: 'contain',
  },
});

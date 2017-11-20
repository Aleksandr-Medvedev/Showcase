/**
 * Created by Aleksandr_Medvedev on 6/5/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  containerRoot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeImage: {
    margin: 4,
    height: 80,
    width: 80,
    backgroundColor: Colors.lightGray,
  },
  text: {
    color: Colors.materialTextPrimary,
    textAlign: 'center',
  },

});

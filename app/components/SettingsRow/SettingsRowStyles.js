/**
 * Created by Aleksandr_Medvedev on 7/27/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16,
  },
  accessibilityIdentifier: {
    height: 12,
    width: 12,
  },
});

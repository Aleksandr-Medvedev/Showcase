/**
 * Created by Aleksandr_Medvedev on 8/22/17.
 */

import { StyleSheet } from 'react-native';

import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  icon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginRight: 8,
  },
});

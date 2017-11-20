/**
 * Created by Aleksandr_Medvedev on 8/16/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  container: {
    height: 36,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerChecked: {
    borderWidth: 2,
    padding: 6,
    borderColor: Colors.materialAccentOrangeA400,
  },
  containerTouchable: {
    padding: 4,
  },
  imageCheckmark: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
});

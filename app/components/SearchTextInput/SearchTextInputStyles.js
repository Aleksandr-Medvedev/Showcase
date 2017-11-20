/**
 * Created by Aleksandr_Medvedev on 8/28/17.
 */

import { CELL_HEIGHT } from 'app/constants/constants';
import { StyleSheet, Platform } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  containerSearch: {
    height: CELL_HEIGHT,
    alignSelf: 'stretch',
    backgroundColor: Colors.materialDividers,
    padding: 6,
  },
  containerSearchBorder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  imageSearch: {
    height: 24,
    width: 24,
    marginHorizontal: 4,
  },
  textInputSearch: {
    flex: 1,
    height: 24,
    padding: 0,
    ...Platform.select({
      ios: {
        marginTop: 4,
      },
    }),
  },
});

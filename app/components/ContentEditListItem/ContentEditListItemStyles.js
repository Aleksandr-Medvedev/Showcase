import { StyleSheet } from 'react-native';

import colors from 'app/styles/Colors';

export default StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    flex: 1,
    paddingHorizontal: 20,
    minHeight: 60,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  listItemTitle: {
    color: colors.black,
    flex: 1,
  },
  listItemRight: {
    flex: 0,
    width: 30,
    paddingLeft: 10,
  },
  listItemCheckedIcon: {
    width: 30,
    height: 30,
  },
});

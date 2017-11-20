import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  menu: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    backgroundColor: Colors.menuBackground,
  },
  item: {
    marginVertical: 12,
  },
  textVersion: {
    color: Colors.materialTextPrimaryInverse,
  },
  appVersion: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
});

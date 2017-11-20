import { StyleSheet } from 'react-native';
import colors from 'app/styles/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  switchRight: {
    margin: 4,
  },
});

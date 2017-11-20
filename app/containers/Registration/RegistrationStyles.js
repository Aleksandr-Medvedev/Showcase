/**
 * Created by Aleksandr_Medvedev on 6/5/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';

export default StyleSheet.create({
  containerRoot: {
    padding: 16,
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  containerPicker: {
    borderWidth: 1,
    borderColor: Colors.materialTextSecondary,
    paddingLeft: 6,
    paddingTop: 6,
    height: 32,
  },
  titledTextInput: {
    marginBottom: 8,
  },
  textDisclaimer: {
    textAlign: 'center',
    marginBottom: 4,
  },
  textLink: {
    textDecorationLine: 'underline',
    color: Colors.materialAccentBlueA400,
  },
  loadingContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  footer: {
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  countrySection: {
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
  },
  countryRowText: {
    fontSize: 16,
    paddingTop: 8,
  },
});

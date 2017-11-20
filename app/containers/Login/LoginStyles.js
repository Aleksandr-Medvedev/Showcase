/**
 * Created by Aleksandr_Medvedev on 5/19/17.
 */

import { StyleSheet } from 'react-native';
import Colors from 'app/styles/Colors';
import { MAX_TABLET_BUTTON_WIDTH } from 'app/constants/constants';

export default StyleSheet.create({
  containerVerticalCentered: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerCredentials: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    marginTop: 40,
    margin: 16,
  },
  containerForgotPasswordDescription: {
    padding: 24,
    paddingTop: 20,
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  containerForgotPasswordButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.materialDividers,
  },
  containerCredentialsToolbar: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerFooter: {
    padding: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  containerForgotPasswordModal: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.materialTextSecondary,
  },
  containerForgotPasswordDialog: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: Colors.white,
    borderRadius: 4,
    maxWidth: 480,
    marginHorizontal: 28,
  },
  'containerFooter--tablet': {
    padding: 16,
    justifyContent: 'center',
    width: MAX_TABLET_BUTTON_WIDTH,
  },
  containerScroll: {
    flex: 1,
  },
  logo: {
    height: 55,
    marginTop: 80,
    resizeMode: 'contain',
  },
  buttonSignIn: {
    width: 120,
  },
  textForgotPassword: {
    marginTop: 4,
    color: Colors.materialTextPrimaryInverse,
  },
  textStayLoggedIn: {
    marginLeft: 4,
  },
  textGetStarted: {
    textDecorationLine: 'underline',
  },
  text: {
    color: Colors.materialTextPrimaryInverse,
  },
  textForgotPasswordTitle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.materialDividers,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: 24,
    paddingBottom: 20,
  },
  textForgotPasswordDescription: {
    marginBottom: 8,
  },
  textForgotPasswordButton: {
    color: Colors.materialAccentBlueA700,
  },
  textForgotPasswordButtonDisabled: {
    color: Colors.materialAccentBlueA100,
  },
  textInput: {
    marginTop: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    color: Colors.materialTextPrimary,
    paddingLeft: 16,
  },
  textInputForgotPassword: {
    borderRadius: 2,
    borderColor: Colors.materialTextSecondary,
    borderWidth: 1,
    paddingHorizontal: 16,

  },
  loadingContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonContinueWithGoogle: {
    backgroundColor: Colors.materialGrey600,
    alignSelf: 'stretch',
    marginBottom: 32,
  },
  buttonContinueWithFacebook: {
    alignSelf: 'stretch',
    backgroundColor: Colors.blue,
    marginBottom: 16,
  },
  buttonForgotPassword: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  separatorVertical: {
    width: 1,
    backgroundColor: Colors.materialDividers,
  },
});

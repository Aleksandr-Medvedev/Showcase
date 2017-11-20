/**
 * Created by Aleksandr_Medvedev on 5/3/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  TextInput,
  Text,
  Alert,
  AsyncStorage,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  BackHandler, // eslint-disable-line react-native/split-platform-components
  KeyboardAvoidingView,
  Platform,
  NativeModules,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import PropTypes from 'prop-types';
import RNHotline from 'app/containers/SupportChat/RNHotline';

import Config from 'react-native-config';
import GoogleSignIn from 'react-native-google-sign-in';
import Colors from 'app/styles/Colors';
import CheckBox from 'app/components/Checkbox/Checkbox';
import BorderedButton from 'app/components/BorderedButton/BorderedButton';
import ButtonWithIcon from 'app/components/ButtonWithIcon/ButtonWithIcon';
import GeneralStyles from 'app/styles/GeneralStyles';
import { signIn, setStayLoggedIn, resetExistingLogin } from 'app/actions/LoginActions';
import * as StorageKeys from 'app/constants/StorageKeys';
import AuthenticationComponent from 'app/components/Authentication/AuthenticationComponent';
import ModalSpinner from 'app/components/ModalSpinner/ModalSpinner';
import * as CountriesActions from 'app/actions/CountriesActions';
import * as ForgotPasswordActions from 'app/actions/ForgotPasswordActions';
import { getAlert } from 'app/utils/GoogleSignInAlertCreator';
import LoginStyles from './LoginStyles';
import {
  FACEBOOK_USER_LOGIN, OAUTH_LOGINS, GOOGLE_USER_LOGIN, MAX_TABLET_BUTTON_WIDTH,
} from 'app/constants/constants';

/**
 * The solution of reading params from the TextInputs here comes from the discussion on the GitHub:
 * https://github.com/facebook/react-native/issues/511#issuecomment-170406218
 */

class LoginContainer extends AuthenticationComponent {

  // ========================================== //
  // Lifecycle
  // ========================================== //

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      originalStayLoggedIn: false,
      showForgotPassword: false,
      forgotPasswordEmail: '',
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.setStateStayLoggedIn = this.setStateStayLoggedIn.bind(this);
    this.handleContinueWithGoogle = this.handleContinueWithGoogle.bind(this);
    this.handleContinueWithFacebook = this.handleContinueWithFacebook.bind(this);
    this.handleExistingLogin = this.handleExistingLogin.bind(this);
    this.textInputProps = {
      style: [GeneralStyles.textInput, LoginStyles.textInput],
      placeholderTextColor: Colors.materialTextSecondary,
      underlineColorAndroid: Colors.transparent,
    };
  }

  componentWillMount() {
    RNHotline.init(Config.HOTLINE_APP_ID, Config.HOTLINE_APP_KEY, {});
    RNHotline.logOut();
    AsyncStorage.getItem(StorageKeys.LOGIN)
      .then((value) => {
        if (OAUTH_LOGINS.indexOf(value) === -1) {
          this.setState({ login: value });
        } else {
          LoginManager.logOut();
          GoogleSignIn.signOut();
        }
      });
  }

  componentWillReceiveProps(props) {
    if (props.existingLogin) {
      Alert.alert(
        'Warning!',
        `The account you specified (${props.existingLogin}) already exists`,
        [
          {
            text: 'OK',
            onPress: () => this.handleExistingLogin(props.existingLogin),
          },
        ],
      );
    } else if (!this.props.existingLogin) { // to prevent error from extra appearing
      super.componentWillReceiveProps(props);
    }
  }

  componentDidMount() {
    this.props.dispatch(CountriesActions.getCountries());
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.loading && !prevProps.forgotPassword) &&
      (!this.props.loading && this.props.forgotPassword)) {
      this.props.dispatch(ForgotPasswordActions.resetForgotPassword());
      this.setState({ showForgotPassword: false }, () => setTimeout(() => Alert.alert(
        'Warning',
        'An email has been sent with instructions to reset your password',
        [{ text: 'OK' }],
      ), 800));
    }

    if (!prevState.showForgotPassword && this.state.showForgotPassword) {
      this.forgotPasswordInput.focus();
    }
  }

  // ========================================== //
  // AuthenticationComponent
  // ========================================== //

  authenticationIsFinished(props) {
    console.log(props);
  }

  // ========================================== //
  // Setters
  // ========================================== //

  setStateStayLoggedIn(stayLoggedIn) {
    this.props.dispatch(setStayLoggedIn(stayLoggedIn));
    if (stayLoggedIn) {
      NativeModules.LocalyticsModule.tagEvent('Sign In - Stay logged in checkbox');
    }
  }

  // ========================================== //
  // Actions
  // ========================================== //

  handleForgotPassword(email) {
    this.props.dispatch(ForgotPasswordActions.postForgotPassword(email));
  }

  handleExistingLogin(login) {
    this.props.dispatch(resetExistingLogin());
    this.setState({ login });
    this.passwordInput.focus();
  }

  handleSignIn() {
    const { login, password } = this.state;
    const createAlert = (phrase) => setTimeout(() => Alert.alert(
      'Warning!',
      phrase,
      [
        { text: 'OK' },
      ],
    ), 200);

    if (!login && !password) {
      //noinspection JSCheckFunctionSignatures
      createAlert('Please enter your username or email address and password');
      return;
    } else if (!login) {
      //noinspection JSCheckFunctionSignatures
      createAlert('Please enter your username or email address');
      return;
    } else if (!password) {
      createAlert('Please enter your password');
      return;
    }

    NativeModules.LocalyticsModule.tagEvent('Sign In – Join with Email');
    this.props.dispatch(signIn(login, password));
  }

  handleContinueWithGoogle() {
    NativeModules.LocalyticsModule.tagEvent('Sign In – Sign In with Google');
    GoogleSignIn.configure({
      // iOS
      clientID: Config.GOOGLE_IOS_CLIENT_ID,

      // iOS, Android
      // https://developers.google.com/identity/protocols/googlescopes
      scopes: [
        'email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://mail.google.com',
      ],

      // iOS, Android
      // Whether to request email and basic profile.
      // [Default: true]
      // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
      shouldFetchBasicProfile: false,

      // Android
      // Whether to request server auth code. Make sure to provide `serverClientID`.
      // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String,
      // boolean)
      offlineAccess: true,

      // Android
      // Whether to force code for refresh token.
      // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String,
      // boolean)
      forceCodeForRefreshToken: false,

      // iOS, Android
      // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#ae214ed831bb93a06d8d9c3692d5b35f9
      serverClientID: Config.GOOGLE_SERVER_ID,
    })
      .then(() => GoogleSignIn.signInPromise())
      .then((user) => this.props.dispatch(signIn(GOOGLE_USER_LOGIN, user.accessToken)))
      .catch((err) => {
        getAlert(err);
        console.warn(JSON.stringify(err));
      });
  }

  handleContinueWithFacebook() {
    NativeModules.LocalyticsModule.tagEvent('Sign In – Sign In with Facebook');
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_location'])
      .then(() => {
          AccessToken.getCurrentAccessToken().then(
            (data) => this.props.dispatch(signIn(FACEBOOK_USER_LOGIN, data.accessToken.toString()))
          );
        },
      )
      .catch((error) => {
        console.warn(error);
      });
  }

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    return (
      <Image
        source={require('app/images/background.png')}
        style={GeneralStyles.containerBackgroundImage}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={GeneralStyles.container}
        >
          {this.renderForgotPasswordDialog()}
          <ScrollView
            style={LoginStyles.containerScroll}
            contentContainerStyle={LoginStyles.containerVerticalCentered}
          >
            <ModalSpinner
              visible={this.props.loading}
              onRequestClose={BackHandler.exitApp}
            />
            <Image
              source={require('app/images/showcase-white-logo.png')}
              style={LoginStyles.logo}
            />
            <View style={
              [GeneralStyles.containerVerticallyCentered, LoginStyles.containerCredentials]
            }>
              <TextInput
                {...this.textInputProps}
                returnKeyType="next"
                placeholder="your@email.com"
                keyboardType="email-address"
                blurOnSubmit={false}
                onChangeText={login => this.setState({ login })}
                value={this.state.login}
                onSubmitEditing={() => this.passwordInput.focus()}
              />
              <TextInput
                {...this.textInputProps}
                ref={passwordInput => this.passwordInput = passwordInput}
                returnKeyType="done"
                placeholder="password"
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={this.handleSignIn}
              />
              {this.renderCredentialsToolbar()}
            </View>
            {this.renderFooter()}
            <View style={GeneralStyles.navigationBarKeyboardAvoidAnchor}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </Image>
    );
  }

  renderCredentialsToolbar() {
    return (
      <View style={LoginStyles.containerCredentialsToolbar}>
        <View style={GeneralStyles.containerHorizontallyCentered}>
          <CheckBox checked={this.props.stayLoggedIn} onToggle={this.setStateStayLoggedIn}/>
          <Text style={[GeneralStyles.textBodyOne, LoginStyles.text, LoginStyles.textStayLoggedIn]}>
            Stay logged in
          </Text>
        </View>
        <View style={LoginStyles.containerVerticalCentered}>
          <BorderedButton
            title="Sign In"
            onPress={this.handleSignIn}
            textStyle={LoginStyles.buttonSignIn}
          />
          <TouchableHighlight
            onPress={() => this.setState({ showForgotPassword: true })}
            underlayColor={Colors.transparent}
            activeOpacity={0.4}
          >
            <Text style={[GeneralStyles.textCaption, LoginStyles.textForgotPassword]}>
              Forgot password?
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderForgotPasswordDialog() {
    return <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.showForgotPassword}
      onRequestClose={() => this.setState({ showForgotPassword: false })}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={LoginStyles.containerForgotPasswordModal}
      >
        <View style={LoginStyles.containerForgotPasswordDialog}>
          <View style={LoginStyles.containerForgotPasswordDescription}>
            <Text style={[GeneralStyles.textBodyOne, LoginStyles.textForgotPasswordDescription]}>
              Please specify your email address to recover your password
            </Text>
            <TextInput
              ref={forgotPasswordInput => this.forgotPasswordInput = forgotPasswordInput}
              style={[GeneralStyles.textInput, LoginStyles.textInputForgotPassword]}
              placeholder="your@email.com"
              onChangeText={forgotPasswordEmail => this.setState({ forgotPasswordEmail })}
              value={this.state.forgotPasswordEmail}
              onSubmitEditing={() => this.handleForgotPassword(this.state.forgotPasswordEmail)}
            />
          </View>
          <View style={LoginStyles.containerForgotPasswordButtons}>
            {this.renderForgotPasswordButton(
              'CANCEL',
              () => this.setState({ showForgotPassword: false }),
            )}
            <View style={LoginStyles.separatorVertical}/>
            {this.renderForgotPasswordButton(
              'OK',
              () => this.handleForgotPassword(this.state.forgotPasswordEmail),
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>;
  }

  renderForgotPasswordButton(title, onPress) {
    const textStyle = [GeneralStyles.textBodyTwo, LoginStyles.textForgotPasswordButton];
    if (this.props.loading) {
      textStyle.push(LoginStyles.textForgotPasswordButtonDisabled);
    }

    return <TouchableHighlight
      style={LoginStyles.buttonForgotPassword}
      underlayColor={Colors.materialDividers}
      onPress={onPress}
      disabled={this.props.loading}
    >
      <Text style={textStyle}>
        {title}
      </Text>
    </TouchableHighlight>;
  }

  renderFooter() {
    let width = Dimensions.get('window').width;
    return (
      <View style={(width <= MAX_TABLET_BUTTON_WIDTH) ?
        [LoginStyles.containerVerticalCentered, LoginStyles.containerFooter] :
        [LoginStyles.containerVerticalCentered, LoginStyles['containerFooter--tablet']]}
      >
        <ButtonWithIcon
          title="Continue with Facebook"
          onPress={this.handleContinueWithFacebook}
          style={LoginStyles.buttonContinueWithFacebook}
          icon={require('app/images/FB.png')}
        />
        <ButtonWithIcon
          title="Continue with Google"
          onPress={this.handleContinueWithGoogle}
          style={LoginStyles.buttonContinueWithGoogle}
          icon={require('app/images/Google.png')}
        />
        <Text style={[GeneralStyles.textBodyTwo, LoginStyles.text]}>
          New to Showcase?
        </Text>
        <TouchableOpacity onPress={Actions.signingUpType}>
          <Text style={[GeneralStyles.textBodyTwo, LoginStyles.text, LoginStyles.textGetStarted]}>
            Get Started!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginContainer.propTypes = {
  ...AuthenticationComponent.propTypes,
  payload: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  error: PropTypes.bool,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  stayLoggedIn: PropTypes.bool,
  existingLogin: PropTypes.string,
};

function getErrorPayload(...states) {
  for (const state of states) {
    if (state.error) {
      return state.payload;
    }
  }

  return null;
}

function getErrorStatus(...states) {
  let errorState = false;
  for (const state of states) {
    if (state.loading) {
      return false;
    }

    if (!errorState) {
      errorState = errorState || state.error;
    }
  }

  return errorState;
}

function mapStateToProps(state) {
  const { authentication, login, user, forgotPassword } = state;
  return {
    token: authentication.token,
    user: user.payload,
    errorPayload: getErrorPayload(login, user) || forgotPassword.errorPayload,
    error: getErrorStatus(login, user, forgotPassword),
    loading: login.loading || forgotPassword.loading,
    stayLoggedIn: login.stayLoggedIn,
    existingLogin: login.existingLogin,
    invokingKey: 'login',
    forgotPassword: forgotPassword.success,
  };
}

export default connect(mapStateToProps)(LoginContainer);

/**
 * Created by Aleksandr_Medvedev on 6/5/17.
 */

import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Linking,
  Alert,
  Platform,
  ListView,
  TouchableOpacity,
  NativeModules,
  KeyboardAvoidingView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as CountriesActions from 'app/actions/CountriesActions';
import TitledTextInput from 'app/components/TitledTextInput/TitledTextInput';
import * as StringChecker from 'app/utils/StringChecker';
import * as RegistrationActions from 'app/actions/RegistrationActions';
import AuthenticationComponent from 'app/components/Authentication/AuthenticationComponent';
import ModalSpinner from 'app/components/ModalSpinner/ModalSpinner';
import BlueCrossPlatformButton from
  'app/components/BlueCrossPlatformButton/BlueCrossPlatformButton';
import Colors from 'app/styles/Colors';
import GeneralStyles from 'app/styles/GeneralStyles';
import TitledTextInputStyles from 'app/components/TitledTextInput/TitledTextInputStyles';
import RegistrationStyles from './RegistrationStyles';
import FullScreenDialogListView from
  'app/components/FullScreenDialogListView/FullScreenDialogListView';

export const AccountTypes = Object.freeze({
  INDIVIDUAL: 0,
  TEAM: 1,
});
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

/**
 * The solution of reading params from the TextInputs here comes from the discussion on the GitHub:
 * https://github.com/facebook/react-native/issues/511#issuecomment-170406218
 */

class RegistrationContainer extends AuthenticationComponent {

  // ========================================== //
  // Lifecycle
  // ========================================== //

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      country: null,
      phoneNumber: '',
      firstName: '',
      lastName: '',
      isSelectingCountry: false,
    };
    this.sharedTextInputProps = {
      returnKeyType: 'next',
      style: RegistrationStyles.titledTextInput,
      isMandatory: true,
      blurOnSubmit: false,
      underlineColorAndroid: Colors.transparent,
    };
    this.OnSignUp = this.signUp.bind(this);
    this.digitRegexp = /\d/g;
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (!this.state.country && nextProps.countries) {
      this.setState({ country: nextProps.countries[0] });
    }
  }

  componentWillMount() {
    this.setState({
      country: Array.isArray(this.props.countries) ? this.props.countries[0] : null,
    });
  }

  componentDidMount() {
    if (!this.props.countries || !this.props.countries.length) {
      this.props.dispatch(CountriesActions.getCountries());
    }
  }

  componentWillUnmount() {
    this.props.dispatch(RegistrationActions.clearState());
  }

  // ========================================== //
  // AuthenticationComponent
  // ========================================== //

  authenticationIsFinished() {
    Actions.signedIn();
  }

  // ========================================== //
  // Actions
  // ========================================== //

  signUp() {
    NativeModules.LocalyticsModule.tagEvent('Join – Join button');
    if (!this.checkFields()) {
      return;
    }

    const signUpDevice = Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID';
    switch (this.props.accountType) {
      case AccountTypes.INDIVIDUAL:
        this.props.dispatch(RegistrationActions.signUpUser({
          email: this.state.email,
          password: this.state.password,
          country: {
            // todo Remove this object, when API is ready to handle this request
            '@metadata': { action: 'LOOKUP', key: 'id' },
            id: this.state.country.id,
          },
          contactMethods: [
            {
              value: this.state.phoneNumber,
              type: {
                // todo Remove this object, when API is ready to handle this request
                '@metadata': { action: 'LOOKUP', key: 'name' },
                name: 'Phone',
              },
            },
          ],
          signUpDevice,
        }, this.props.sceneKey));
        return;
      case AccountTypes.TEAM:
        this.props.dispatch(RegistrationActions.signUpTeam({
          email: this.state.email,
          password: this.state.password,
          country: this.state.country,
          phone: this.state.phoneNumber,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          signUpDevice,
        }, this.props.sceneKey));
        return;
    }
  }

  onPhoneNumberInput(newValue) {
    let phoneNumber = newValue.match(this.digitRegexp);
    phoneNumber ? phoneNumber = phoneNumber.join('') : phoneNumber = '';
    this.setState({ phoneNumber });
  }

  checkFields() {
    let areFieldsFilled = (
      this.state.password && this.state.email && this.state.country
    );
    if (this.props.accountType === AccountTypes.TEAM) {
      areFieldsFilled = areFieldsFilled && (
        this.state.phoneNumber && this.state.firstName && this.state.lastName
      );
    }

    const showAlert = (message) => Alert.alert(
      'Warning!',
      message,
      [
        { text: 'OK' },
      ],
    );

    if (!areFieldsFilled) {
      showAlert('Please fill all required fields.');
      return false;
    }

    if (!StringChecker.checkPassword(this.state.password)) {
      showAlert('Password must contain at least 8 characters and one number');
      return false;
    }

    if (
      !StringChecker.checkEmail(this.state.email) ||
      (this.state.phoneNumber && !StringChecker.checkPhoneNumber(this.state.phoneNumber))
    ) {
      showAlert('Please provide valid email address and phone number');
      return false;
    }

    return true;
  }

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={GeneralStyles.container}
      >
        <ScrollView
          contentContainerStyle={RegistrationStyles.containerRoot}
          keyboardShouldPersistTaps='always'
        >
          <ModalSpinner
            visible={this.props.loading}
            onRequestClose={Actions.pop}
          />
          {this.renderNameFields()}
          <TitledTextInput
            {...this.sharedTextInputProps}
            ref={emailInput => this.emailInput = emailInput}
            title={'Email'}
            placeholder={'email address'}
            keyboardType={'email-address'}
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={email => this.setState({ email })}
          />
          <TitledTextInput
            {...this.sharedTextInputProps}
            ref={passwordInput => this.passwordInput = passwordInput}
            title={'Password'}
            placeholder={'password'}
            secureTextEntry={true}
            blurOnSubmit={true}
            informationText={'Must contain at least 8 characters and one number'}
            onChangeText={password => this.setState({ password })}
          />
          {this.renderCountriesRow()}
          <TitledTextInput
            {...this.sharedTextInputProps}
            ref={phoneNumberInput => this.phoneNumberInput = phoneNumberInput}
            title={'Phone Number'}
            isMandatory={this.props.accountType === AccountTypes.TEAM}
            placeholder={'phone number'}
            keyboardType={'phone-pad'}
            returnKeyType={'send'}
            blurOnSubmit={true}
            onSubmitEditing={this.OnSignUp}
            onChangeText={phoneNumber => this.onPhoneNumberInput(phoneNumber)}
            value={this.state.phoneNumber}
            maxLength={15}
          />
          <View style={RegistrationStyles.footer}>
            <Text style={[GeneralStyles.textCaption, RegistrationStyles.textDisclaimer]}>
              Tapping "Join" confirms that you agree to the Showcase <Text
              style={RegistrationStyles.textLink}
              onPress={() => Linking.openURL('https://www.showcase.com/terms')}>
              Terms of Service
            </Text>
            </Text>
            <BlueCrossPlatformButton title={'JOIN'} onPress={this.OnSignUp}/>
          </View>
          <View style={GeneralStyles.navigationBarKeyboardAvoidAnchor}/>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  openUrl() {
    NativeModules.LocalyticsModule.tagEvent('Join – Terms of Service');
    Linking.openURL('https://www.showcase.com/terms');
  }

  renderCountriesRow() {
    return <View style={RegistrationStyles.titledTextInput}>
      {this.renderCountriesDialog()}
      <Text style={GeneralStyles.textCaption}>
        Country<Text style={TitledTextInputStyles.textMandatory}> *</Text>
      </Text>
      <Text style={[TitledTextInputStyles.textInput,
        GeneralStyles.textInput,
        RegistrationStyles.countryRowText,
      ]}
         onPress={()=>this.setState({ isSelectingCountry: true })}>
          {this.state.country ? this.state.country.name : null}
      </Text>
      {this.props.informationText ?
        <Text style={GeneralStyles.textCaption}>{this.props.informationText}</Text> :
        null}
    </View>;
  }

  renderCountriesDialog() {
    if (this.props.countries) {
      return <FullScreenDialogListView
        isVisible={this.state.isSelectingCountry}
        onClickOutOfListView= {()=> {
          this.setState({
            isSelectingCountry: false,
          });
        }
        }
        onRequestClose={()=> {
          this.setState({
            isSelectingCountry: false,
          });
        }
        }
        renderSeparator={
          (sectionId, rowId)=><View key={rowId} style={RegistrationStyles.separator}/>
        }
        renderRow={(rowData, sectionID, rowID) => (
          <TouchableOpacity underlayColor={Colors.gray}
                            style={[RegistrationStyles.countrySection]}
                            onPress={() =>
                              this.setState({ country: rowData, isSelectingCountry: false })}
          >
            <Text key={rowID}
                  style={[RegistrationStyles.countryRowText]}
              >
              {rowData.name}
              </Text>
          </TouchableOpacity>)
        }
        dataSource={ ds.cloneWithRows(this.props.countries) }
      />;
    } else {
      return null;
    }
  }

  renderNameFields() {
    switch (this.props.accountType) {
      case AccountTypes.INDIVIDUAL:
        return null;
      case AccountTypes.TEAM: {
        const sharedProps = {
          ...this.sharedTextInputProps,
          autoCapitalize: 'words',
        };
        return (
          <View>
            <TitledTextInput
              {...sharedProps}
              title={'First Name'}
              placeholder={'first name'}
              style={RegistrationStyles.titledTextInput}
              onSubmitEditing={() => this.lastNameInput.focus()}
              onChangeText={firstName => this.setState({ firstName })}
            />
            <TitledTextInput
              {...sharedProps}
              ref={lastNameInput => this.lastNameInput = lastNameInput}
              title={'Last Name'}
              isMandatory={true}
              placeholder={'last name'}
              style={RegistrationStyles.titledTextInput}
              onSubmitEditing={() => this.emailInput.focus()}
              onChangeText={lastName => this.setState({ lastName })}
            />
          </View>
        );
      }
    }
  }
}

function getErrorPayload(state) {
  if (state.error) {
    return state.payload;
  }

  return null;
}

RegistrationContainer.propTypes = {
  ...AuthenticationComponent.propTypes,
  payload: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  error: PropTypes.bool,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  accountType: PropTypes.oneOf(Object.values(AccountTypes)),
  countries: PropTypes.array,
};

function mapStateToProps(state) {
  const { authentication, registration, countries } = state;
  return {
    user: authentication.user,
    token: authentication.token,
    errorPayload: getErrorPayload(registration),
    payload: registration.payload,
    error: registration.error,
    loading: registration.loading,
    countries: countries.payload,
    invokingKey: registration.meta.invokingKey,
  };
}

export default connect(mapStateToProps)(RegistrationContainer);

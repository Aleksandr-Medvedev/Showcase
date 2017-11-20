import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene, Modal } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import AccountTypeContainer from './AccountType/AccountTypeContainer';
import RegistrationContainer from './Registration/RegistrationContainer';
import TeamRegistrationContainer from './TeamRegistrationContainer/TeamRegistrationContainer';
import SplashScreen from 'app/components/SplashScreen/SplashScreen';
import NavigationSwitchContainer from './NavigationSwitch/NavigationSwitchContainer';
import SigningUpTypeContainer from './SigningUpType/SigningUpTypeContainer';
import DatePickerComponent from 'app/components/DatePicker/DatePickerComponent';

import GeneralStyles from 'app/styles/GeneralStyles';

import { authenticateLocally } from 'app/actions/AuthenticationActions';

export const navigationBarHeight = (Platform.OS === 'ios' ? 64 : 54);

const getSceneStyle = (props, computedProps) => {
  if (!computedProps.isActive) {
    return null;
  }

  const style = {
    flex: 1,
  };
  style.marginTop = computedProps.hideNavBar ? 0 : navigationBarHeight;
  return style;
};


class App extends React.Component {

  // ========================================== //
  // Lifecycle
  // ========================================== //

  componentWillMount() {
    this.props.dispatch(authenticateLocally());
    StatusBar.setBarStyle('light-content', true);
  }

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    const navigationBarButtonsTextStyle = [
      GeneralStyles.textBodyTwo,
      GeneralStyles.navigationBarButtonTextStyle,
    ];

    const navStyleProps = {
      navigationBarStyle: GeneralStyles.navigationBar,
      titleStyle: [GeneralStyles.textTitle, GeneralStyles.navigationBarTitle],
      leftButtonIconStyle: GeneralStyles.navigationBarIconStyle,
      rightButtonTextStyle: navigationBarButtonsTextStyle,
      backButtonTextStyle: navigationBarButtonsTextStyle,
      hideNavBar: false,
      backTitle: 'Back',
    };
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="modal" component={Modal} >
          <Scene
            key="root"
            component={NavigationSwitchContainer}
            selector={
              props => props.loading
                ? 'splash'
                  : props.token && props.user && !props.userDataLoading
                    ? 'signedIn'
                    : 'signedOut'
            }
            tabs
            unmountScenes
          >
            <Scene
              key="splash"
              component={SplashScreen}
              source={require('app/images/splash.png')}
              hideNavBar
            />

            {this.renderSignedOut(navStyleProps)}
            {this.renderSignedIn(navStyleProps)}
          </Scene>
          <Scene
            key="datePicker"
            component={DatePickerComponent}
            direction="vertical"
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }

  renderSignedOut(navStyleProps) {
    return (
      <Scene key="signedOut">
        <Scene
          key="login"
          component={LoginContainer}
          hideNavBar={true}
        />
        <Scene
          key="signingUpType"
          component={SigningUpTypeContainer}
          hideNavBar={true}
        />
        <Scene
          key="accountType"
          component={AccountTypeContainer}
          title={'Account Type'}
          {...navStyleProps}
        />
        <Scene
          panHandlers={null}
          key="teamRegistration"
          component={TeamRegistrationContainer}
          title="Create Account"
          {...navStyleProps}
        />
        <Scene
          key="registration"
          component={RegistrationContainer}
          title="Create Account"
          {...navStyleProps}
        />
      </Scene>
    );
  }

  renderSignedIn(navStyleProps) {
    /**
     * content of this render has been removed to protect intellectual property
     */
    return (
      <Scene key="signedIn">

      </Scene>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(App);

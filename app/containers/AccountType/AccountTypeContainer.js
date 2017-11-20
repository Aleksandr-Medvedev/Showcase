/**
 * Created by Aleksandr_Medvedev on 6/1/17.
 */

import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import GeneralStyles from 'app/styles/GeneralStyles';
import AccountTypeStyles from './AccountTypeStyles';
import { AccountTypes } from 'app/containers/Registration/RegistrationContainer';

class AccountTypeContainer extends Component {

  // ========================================== //
  // Actions
  // ========================================== //

  openRegistration(accountType) {
    Actions.registration({ accountType });
  }

  openTeamRegistration() {
    Actions.teamRegistration();
  }

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    const buttonContainerStyles = [
      GeneralStyles.containerVerticallyCentered,
    ];
    const buttonTextStyles = [GeneralStyles.textCaption, AccountTypeStyles.text];
    const imageProps = {
      style: AccountTypeStyles.typeImage,
      resizeMode: 'contain',
    };

    return (
      <View style={AccountTypeStyles.containerRoot}>
        <View style={buttonContainerStyles}>
          <TouchableOpacity onPress={() => this.openRegistration(AccountTypes.INDIVIDUAL)}>
            <Image
              {...imageProps}
              source={require('app/images/indiv.png')}
            />
          </TouchableOpacity>
          <Text style={buttonTextStyles}>
            Individual
          </Text>
        </View>
        <View style={buttonContainerStyles}>
          <TouchableOpacity onPress={() => this.openTeamRegistration()}>
            <Image
              {...imageProps}
              source={require('app/images/team.png')}
            />
          </TouchableOpacity>
          <Text style={buttonTextStyles}>
            Team (2+ Members)
          </Text>
        </View>
      </View>
    );
  }
}

export default AccountTypeContainer;

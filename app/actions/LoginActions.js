/**
 * Created by Aleksandr_Medvedev on 5/19/17.
 */

import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';
import Base64 from 'base-64';

import * as StorageKeys from 'app/constants/StorageKeys';
import * as ActionTypes from 'app/constants/actionTypes';

export function signIn(login, password) {
  const basicHash = Base64.encode(`${login}:${password}`);
  const input = `${Config.API_ROOT_V1}/custom/sessions`;
  const init = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicHash}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload: {
      input,
      init,
      login,
    },
    meta: {
      isHTTPRequest: true,
      isResultSelfHandled: true,
      failureAction: {
        type: ActionTypes.LOGIN_REQUEST_FAILURE,
      },
      successAction: {
        type: ActionTypes.LOGIN_REQUEST_SUCCESS,
      },
      loadingAction: {
        type: ActionTypes.LOGIN_REQUEST_STARTED,
      },
    },
  };
}

export function setStayLoggedIn(stayLoggedIn) {
  return (dispatch) => {
    AsyncStorage.setItem(StorageKeys.STAY_LOGGED_IN, JSON.stringify(stayLoggedIn))
      .then(() => dispatch(
        {
          type: ActionTypes.LOGIN_SET_STAY_LOGGED_IN,
          payload: { stayLoggedIn },
        }));
  };
}

export function setExistingLogin(login) {
  return {
    type: ActionTypes.SET_EXISTING_LOGIN,
    payload: login,
  };
}

export function resetExistingLogin() {
  return {
    type: ActionTypes.RESET_EXISTING_LOGIN,
  };
}

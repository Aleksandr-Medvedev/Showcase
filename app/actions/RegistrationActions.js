/**
 * Created by Aleksandr_Medvedev on 6/8/17.
 */

import Config from 'react-native-config';

import * as ActionTypes from 'app/constants/actionTypes';
import { GOOGLE_USER_LOGIN } from 'app/constants/constants';

export function signUpUser(params, sceneKey) {
  /**
   * The end-point is not documented, but it should work pretty much like /user endpoint.
   * Please refere to server-side developers for more details
   */
  return signUp(params, '/custom/user', sceneKey);
}

export function signUpTeam(params, sceneKey) {
  return signUp(params, '/team', sceneKey);
}

export function clearState() {
  return {
    type: ActionTypes.REGISTRATION_RESET,
  };
}

function signUp(params, path, sceneKey) {
  const input = `${Config.API_ROOT_V1}${path}`;
  const init = {
    method: 'POST',
    body: JSON.stringify(params),
  };
  return {
    type: ActionTypes.REGISTRATION_REQUEST,
    payload: {
      input,
      init,
      login: params.email,
    },
    meta: {
      isHTTPRequest: true,
      isNewApi: true,
      isErrorSelfHandled: true,
      failureAction: {
        type: ActionTypes.REGISTRATION_REQUEST_FAILURE,
        meta: { invokingKey: sceneKey },
      },
      successAction: {
        type: ActionTypes.REGISTRATION_RESET,
        meta: { invokingKey: sceneKey },
      },
      loadingAction: {
        type: ActionTypes.REGISTRATION_REQUEST_STARTED,
        meta: { invokingKey: sceneKey },
      },
    },
  };
}

export function signUpWithGoogle(token, sceneKey) {
  const input = `${Config.API_ROOT_V1}/user`;
  const init = {
    method: 'POST',
    body: JSON.stringify({
      source: 'google',
      accessToken: token,
    }),
  };
  return {
    type: ActionTypes.REGISTRATION_REQUEST,
    payload: {
      input,
      init,
      login: GOOGLE_USER_LOGIN,
    },
    meta: {
      isHTTPRequest: true,
      isNewApi: true,
      isErrorSelfHandled: true,
      failureAction: {
        type: ActionTypes.REGISTRATION_REQUEST_FAILURE,
        meta: { invokingKey: sceneKey },
      },
      successAction: {
        type: ActionTypes.REGISTRATION_RESET,
        meta: { invokingKey: sceneKey },
      },
      loadingAction: {
        type: ActionTypes.REGISTRATION_REQUEST_STARTED,
        meta: { invokingKey: sceneKey },
      },
    },
  };
}

/**
 * Created by Aleksandr_Medvedev on 9/22/17.
 */

import Config from 'react-native-config';
import * as ActionTypes from 'app/constants/actionTypes';

export function postForgotPassword(email) {
  const input = `${Config.API_ROOT_V1}/passwordReset`;
  const init = {
    method: 'POST',
    body: JSON.stringify({ email }),
  };
  return {
    type: ActionTypes.FORGOT_PASSWORD_REQUEST,
    payload: {
      input,
      init,
    },
    meta: {
      isHTTPRequest: true,
      isNewApi: true,
      failureAction: {
        type: ActionTypes.FORGOT_PASSWORD_REQUEST_FAILURE,
      },
      successAction: {
        type: ActionTypes.FORGOT_PASSWORD_REQUEST_SUCCESS,
      },
      loadingAction: {
        type: ActionTypes.FORGOT_PASSWORD_REQUEST_STARTED,
      },
    },
  };
}

export function resetForgotPasswordError() {
  return {
    type: ActionTypes.RESET_FORGOT_PASSWORD_ERROR,
  };
}

export function resetForgotPassword() {
  return {
    type: ActionTypes.RESET_FORGOT_PASSWORD,
  };
}

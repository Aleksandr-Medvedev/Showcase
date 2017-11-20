/**
 * Created by Aleksandr_Medvedev on 6/26/17.
 */

import { AsyncStorage } from 'react-native';
import * as StorageKeys from 'app/constants/StorageKeys';
import Config from 'react-native-config';
import * as ActionTypes from 'app/constants/actionTypes';

import { SPLASH_SCREEN_DELAY } from '../constants/constants';

export function authenticateLocally() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.NAVIGATION_SWITCH_REQUEST,
    });

    const requestFinished = () => setTimeout(() => {
      dispatch({
        type: ActionTypes.NAVIGATION_SWITCH_REQUEST_FINISHED,
      });
    }, SPLASH_SCREEN_DELAY);

    AsyncStorage.getItem(StorageKeys.STAY_LOGGED_IN)
      .then((value) => {
        const stayLoggedIn = value ? JSON.parse(value) : false;

        if (!stayLoggedIn) {
          return Promise.reject();
        }

        dispatch({
          type: ActionTypes.LOGIN_SET_STAY_LOGGED_IN,
          payload: { stayLoggedIn },
        });

        return AsyncStorage.getItem(StorageKeys.TOKEN)
          .then((value) => dispatch({
            type: ActionTypes.AUTHENTICATION_DATA_RETRIEVED,
            payload: value,
          }));
      })
      .then(() => dispatch({
        type: ActionTypes.STORAGE_RESTORE,
      }))
      .then(requestFinished)
      .catch(requestFinished);
  };
}

export function signOut(errorAction) {
  return (dispatch) => {
    AsyncStorage.multiRemove([StorageKeys.TOKEN, StorageKeys.USER])
      .then(() => {
          dispatch({
            type: ActionTypes.AUTHENTICATION_DATA_RESET,
          });
          dispatch({
            type: ActionTypes.USER_RESET,
          });
        },
      )
      .catch(error => {
        if (errorAction) {
          errorAction.payload = error;
          dispatch(errorAction);
        }
      });
  };
}

export function getUser() {
  const input = `${Config.API_ROOT_V1}/user`;
  const init = {
    method: 'GET',
  };
  return {
    type: ActionTypes.GET_USER_REQUEST,
    payload: {
      input,
      init,
    },
    meta: {
      isHTTPRequest: true,
      isNewApi: true,
      loadingAction: {
        type: ActionTypes.GET_USER_REQUEST_STARTED,
      },
      failureAction: {
        type: ActionTypes.GET_USER_REQUEST_FAILURE,
      },
      successAction: {
        type: ActionTypes.GET_USER_REQUEST_SUCCESS,
      },
    },
  };
}

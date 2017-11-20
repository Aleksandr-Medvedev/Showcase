/**
 * Created by Aleksandr_Medvedev on 5/20/17.
 */

import createReducer from 'app/utils/createReducer';
import * as ActionTypes from 'app/constants/actionTypes';

const initialState = {
  loading: false,
  error: false,
  stayLoggedIn: false,
};

export const login = createReducer(initialState, {

  [ActionTypes.LOGIN_REQUEST_STARTED](state) {
    return {
      ...state,
      loading: true,
      error: false,
    };
  },

  [ActionTypes.LOGIN_REQUEST_SUCCESS](state) {
    return {
      ...state,
      error: false,
      loading: false,
    };
  },

  [ActionTypes.LOGIN_REQUEST_FAILURE](state, action) {
    return {
      ...state,
      loading: false,
      payload: action.payload,
      error: true,
    };
  },

  [ActionTypes.LOGIN_SET_STAY_LOGGED_IN](state, action) {
    return {
      ...state,
      stayLoggedIn: action.payload.stayLoggedIn,
    };
  },

  [ActionTypes.SET_EXISTING_LOGIN](state, action) {
    return {
      ...state,
      existingLogin: action.payload,
    };
  },

  [ActionTypes.RESET_EXISTING_LOGIN](state) {
    return {
      ...state,
      existingLogin: null,
    };
  },

});

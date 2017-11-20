/**
 * Created by Aleksandr_Medvedev on 6/9/17.
 */

import createReducer from 'app/utils/createReducer';
import * as ActionTypes from 'app/constants/actionTypes';

const initialState = {
  loading: false,
  error: false,
  payload: null,
  meta: { invokingKey: '' },
};

export const registration = createReducer(initialState, {
  [ActionTypes.REGISTRATION_REQUEST_STARTED](action) {
    return {
      loading: true,
      error: false,
      meta: action.meta,
    };
  },

  [ActionTypes.REGISTRATION_RESET]() {
    return initialState;
  },

  [ActionTypes.REGISTRATION_REQUEST_FAILURE](state, action) {
    return {
      ...state,
      loading: false,
      payload: action.payload,
      error: true,
      meta: action.meta,
    };
  },
});

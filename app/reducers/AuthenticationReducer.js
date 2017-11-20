/**
 * Created by Aleksandr_Medvedev on 6/22/17.
 */

import createReducer from 'app/utils/createReducer';
import * as ActionTypes from 'app/constants/actionTypes';

const initialState = {
  token: null,
};

export const authentication = createReducer(initialState, {

  [ActionTypes.AUTHENTICATION_DATA_RETRIEVED](state, action) {
    return {
      ...state,
      token: action.payload,
    };
  },

  [ActionTypes.AUTHENTICATION_DATA_RESET]() {
    return initialState;
  },
});

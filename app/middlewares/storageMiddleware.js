/**
 * Created by Aleksandr_Medvedev on 7/13/17.
 */

import { AsyncStorage } from 'react-native';

import * as ActionTypes from 'app/constants/actionTypes';
import * as StorageKeys from 'app/constants/StorageKeys';

const TYPE_TO_KEY_LIST = {
  [ActionTypes.VIDEO_INSTRUCTION_END]: StorageKeys.IS_FIRST_RUN,
  [ActionTypes.GET_USER_REQUEST_SUCCESS]: StorageKeys.USER,
};

// ========================================== //
// Middleware
// ========================================== //

export default store => next => action => {
  const actionType = action.type;
  if (actionType === ActionTypes.STORAGE_RESTORE) {
    const keys = Object.keys(TYPE_TO_KEY_LIST);
    const promises = new Array(keys.length);
    for (const type in TYPE_TO_KEY_LIST) {
      promises.push(AsyncStorage.getItem(TYPE_TO_KEY_LIST[type])
        .then(result => {
          if (result) {
            return store.dispatch(JSON.parse(result));
          }
        }));
    }

    return Promise.all(promises)
      .then(() => store.dispatch({
        type: ActionTypes.STORAGE_RESTORE_SUCCESS,
      }))
      .catch(error => store.dispatch({
        type: ActionTypes.STORAGE_RESTORE_FAILURE,
        payload: error,
      }));
  }

  const storageKey = TYPE_TO_KEY_LIST[actionType];
  if (storageKey) {
    return AsyncStorage.setItem(storageKey, JSON.stringify(action))
      .then(() => next(action));
  } else {
    return next(action);
  }
};

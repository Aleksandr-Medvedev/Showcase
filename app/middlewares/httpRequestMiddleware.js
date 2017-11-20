/**
 * Created by Aleksandr_Medvedev on 6/22/17.
 */

import Base64 from 'base-64';

import Config from 'react-native-config';
import { stringFromHTTPStatus, stringFromServerErrorMessage } from 'app/utils/StringUtils';
import Logger from 'app/utils/Logger';

// ========================================== //
// Augmented methods
// ========================================== //

const handleResponse = response => {
  const responseArea = Math.floor(response.status / 100);

  // When response body is empty (e.g. we delete something and get 204 with empty body),
  // "response.json()" may return error, prevent this situation.
  const jsonPromise = response.text()
    .then(text => {
      const closingBracketIndex = text.search(/[}\]][^}^\]]*$/);
      if (closingBracketIndex < text.length + 1) {
        text = text.substring(0, closingBracketIndex + 1);
      }

      return text ? JSON.parse(text) : Promise.resolve('');
    });

  Logger.log(`<< ${response.url}`);

  if (responseArea === 4 || responseArea === 5) {
    return jsonPromise
      .then(
        json => Promise.reject({
          status: response.status,
          message: json.error || json.errorMessage,
        }),
        () => Promise.reject({
          status: response.status,
          message: stringFromHTTPStatus(response.status),
        }),
      );
  }

  return jsonPromise;
};

export const handleResult = store => action => json => {
  Logger.log(JSON.stringify(json, null, 2));
  const successAction = action.meta.successAction;
  if (successAction) {
    dispatchAction(store, successAction, json);
  }

  return json;
};

export const handleError = store => action => error => {
  Logger.log(JSON.stringify(error, null, 2));
  const failureAction = action.meta.failureAction;
  if (error.message) {
    error.message = stringFromServerErrorMessage(action, error.message);
  }

  if (failureAction) {
    dispatchAction(store, failureAction, error);
  }

  return error;
};

function dispatchAction(store, actionOrArray, payload) {
  if (Array.isArray(actionOrArray)) {
    for (const action of actionOrArray) {
      store.dispatch({
        payload,
        ...action,
      });
    }
  } else {
    return store.dispatch({
      payload,
      ...actionOrArray,
    });
  }
}

// ========================================== //
// Middleware
// ========================================== //

export default store => next => action => {
  if (!action.meta || !action.meta.isHTTPRequest) {
    return next(action);
  }

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const state = store.getState();
  const token = state.authentication && state.authentication.token
    ? state.authentication.token
    : Config.PUBLIC_TOKEN;

  if (action.meta.isNewApi) {
    headers.Authorization = `CALiveAPICreator ${token}:1`;
  } else {
    const basicHash = Base64.encode(`:${token}`);
    headers.Authorization = `Basic ${basicHash}`;
  }

  const init = {
    headers,
    ...action.payload.init,
  };
  Logger.log(`>> ${init.method} ${action.payload.input}`);
  Logger.log(JSON.stringify(init.headers, null, 2));
  if (init.body) {
    Logger.log(JSON.stringify(init.body, null, 2));
  }

  let fetchPromise = fetch(action.payload.input, init);

  const loadingAction = action.meta.loadingAction;
  if (loadingAction) {
    dispatchAction(store, loadingAction);
  }

  if (action.meta.isSelfHandled) {
    return fetchPromise;
  } else {
    fetchPromise = fetchPromise.then(handleResponse);

    if (action.meta.isResultSelfHandled) {
      return fetchPromise;
    }

    fetchPromise = fetchPromise.then(handleResult(store)(action));

    if (action.meta.isErrorSelfHandled) {
      return fetchPromise;
    }

    return fetchPromise.catch(handleError(store)(action));
  }
};

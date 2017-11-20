/**
 * Created by Aleksandr_Medvedev on 6/23/17.
 */

import { AsyncStorage } from 'react-native';

import { handleError, handleResult } from './httpRequestMiddleware';

import * as StorageKeys from 'app/constants/StorageKeys';
import * as ActionTypes from 'app/constants/actionTypes';

import { getUser } from 'app/actions/AuthenticationActions';
import { getExpenseCategory } from 'app/actions/ExpenseCategoriesActions';
import { getCurrencies } from 'app/actions/CurrenciesActions';
import { getJobCodes } from 'app/actions/JobCodesActions';
import { getPaymentTypes } from 'app/actions/PaymentTypesActions';
import { getTags } from 'app/actions/TagsActions';
import { getEmailProviders } from 'app/actions/EmailProvidersActions';
import { getEmailAccounts } from 'app/actions/ConnectEmailActions';
import { getRates } from 'app/actions/RatesActions';
import { getMakesAndModels } from 'app/actions/MakesAndModelsActions';
import { getLicensePlates }from 'app/actions/LicensePlatesActions';
import { resetShowing } from 'app/actions/ShowEmailConnectDialogAction';
import { resetExpenseList } from 'app/actions/ExpensesListActions';
import { resetExpenseCategories } from 'app/actions/ExpenseCategoriesActions';
import { resetJobCodes } from 'app/actions/JobCodesActions';
import { resetTags } from 'app/actions/TagsActions';
import { resetPaymentTypes } from 'app/actions/PaymentTypesActions';
import { resetSubscription } from 'app/actions/SubscriptionActions';
import { resetRates } from 'app/actions/RatesActions';
import { resetMakesAndModels } from 'app/actions/MakesAndModelsActions';
import { resetLicensePlates } from 'app/actions/LicensePlatesActions';
import { resetConnectEmail } from 'app/actions/ConnectEmailActions';

// ========================================== //
// Middleware
// ========================================== //

export default store => next => action => {
  if (
    action.type !== ActionTypes.LOGIN_REQUEST && action.type !== ActionTypes.REGISTRATION_REQUEST
  ) {
    return next(action);
  }

  let authenticationPromise;
  if (action.meta.isPrepared) {
    authenticationPromise = Promise.resolve(action.payload);
  } else {
    authenticationPromise = next(action);
  }

  return getUserData(store, action, authenticationPromise);
};

function getUserData(store, action, authenticationPromise) {
  authenticationPromise
    .then(json => {
      const removePromise = AsyncStorage.multiRemove([
        StorageKeys.TOKEN,
        StorageKeys.LOGIN,
      ]);
      return removePromise.then(() => json);
    })
    .then(json => {
      store.dispatch({
        type: ActionTypes.AUTHENTICATION_DATA_RETRIEVED,
        payload: getToken(json),
      });
      return json;
    })
    .then(json => {
      const userPromise = dispatchOuterCatch(getUser(), store.dispatch);
      return userPromise.then(() => json);
    })
    .then(json => {
      const saveLoginPromise = AsyncStorage.setItem(StorageKeys.LOGIN, action.payload.login);
      return saveLoginPromise.then(() => json);
    })
    .then(json => AsyncStorage.setItem(StorageKeys.TOKEN, getToken(json)).then(() => json))
    .then(handleResult(store)(action))
    .catch(error => {
      store.dispatch({
        type: ActionTypes.AUTHENTICATION_DATA_RESET,
      });

      handleError(store)(action)(error);
    });
}

function getToken(json) {
  let { apikey } = json;

  // todo Rewrite this condition when Registration API is stable.
  if (!apikey) {
    let i = 0;
    while (!apikey && i < json.txsummary.length) {
      apikey = json.txsummary[i].token;
      i++;
    }
  }

  return apikey;
}

function dispatchOuterCatch(action, dispatch) {
  action.meta.isErrorSelfHandled = true;
  const storeSubstitution = { dispatch };

  return dispatch(action).catch(error => {
    handleError(storeSubstitution)(action)(error);
    return Promise.reject(error);
  });
}

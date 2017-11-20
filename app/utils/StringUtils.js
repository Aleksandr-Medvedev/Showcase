/**
 * Created by Aleksandr_Medvedev on 6/22/17.
 */

import { NativeModules } from 'react-native';
import * as ActionTypes from 'app/constants/actionTypes';

export function stringFromHTTPStatus(status) {
  //TODO: do it well
  return `Status ${status} was received`;
}

export function stringFromServerErrorMessage(action, message) {
  switch (action.type) {
    case ActionTypes.REGISTRATION_REQUEST:
      if (/Duplicate entry '.*' for key 'User_Primary_Email_Addr_ID'/.test(message)) {
        return 'The user already exists. Please specify another email';
      }

      break;
    case ActionTypes.LOGIN_REQUEST:
      if (message.indexOf('Error getting user data') > -1) {
        return 'Incorrect username/email or password';
      }

      break;
  }

  return message;
}

const priceStringCache = new Map();

export function stringFromPrice(value, currencyCode) {
  const key = `${value}${currencyCode}`;
  const cachedValue = priceStringCache.get(key);
  if (cachedValue) {
    return Promise.resolve(cachedValue);
  }

  return NativeModules.CurrencyFormatter.getStringFromValue(value, currencyCode, null)
    .then(value => {
      priceStringCache.set(key, value);
      return value;
    });
}

const dateStringCache = new Map();

/**
 * @param timestamp - the timestamp in UNIX-time format
 * @param format - string format form subset of Unicode UTS #35 patterns
 * @param locale - language code to find out the desired locale if it should be different from
 * the default one
 * @returns promise
 */

export function stringFromDate(timestamp, format, locale) {
  if (!timestamp) {
    return null;
  }

  const key = `${timestamp}${format}${locale}`;
  const cachedValue = dateStringCache.get(key);
  if (cachedValue) {
    return Promise.resolve(cachedValue);
  }

  const writeToCache = value => {
    dateStringCache.set(key, value);
    return value;
  };

  if (format) {
    if (locale) {
      return NativeModules.TimeFormatter.getStringFromDate(timestamp, format, locale)
        .then(writeToCache);
    } else {
      return NativeModules.TimeFormatter.getStringFromDate(timestamp, format, null)
        .then(writeToCache);
    }
  } else {
    return NativeModules.TimeFormatter.getStringFromDate(timestamp, null, null)
      .then(writeToCache);
  }
}

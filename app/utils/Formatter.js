/**
 * Created by Vladislav Danilov on 7/26/17.
 */

import * as currencyFormatter from 'currency-formatter';
import moment from 'moment/min/moment-with-locales.min';

import {
  Platform,
  NativeModules,
} from 'react-native';

export function parseDate(dateString, format) {
  if (!dateString) {
    return null;
  }

  return moment.parseZone(dateString, format)._d;
}

export function formatDate(dateData, format, shiftedData, locale) {
  if (!dateData) {
    return null;
  }

  if (locale) {
    moment.locale(locale);
  } else {
    moment.locale(getLocale());
  }

  let date;
  if (typeof dateData === 'string' || dateData instanceof String) {
    date = parseDate(dateData, 'YYYY-MM-DDTHH:mm:ssZ');
  } else {
    date = new Date(dateData);
  }

  if (!shiftedData) {
    date = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );
  }

  return moment(date).format(format || 'ddd, MMM DD');

}

export function formatPrices(currency, price) {
  return currencyFormatter.format(
    price,
    {
      symbol: currency.symbol || currency,
      locale: getLocale(),
    },
  );
}

export function getLocale() {
  let locale;
  if (Platform.OS === 'android') {
    locale = NativeModules.I18nManager.localeIdentifier || 'en-US';
  } else if (Platform.OS === 'ios') {
    locale = NativeModules.SettingsManager.settings.AppleLocale || 'en-US';
  }

  //todo change way of formatting date
  if (locale !== 'en-US')
    return locale.replace('_', '-').split('-')[0];
  else {
    return locale;
  }
}

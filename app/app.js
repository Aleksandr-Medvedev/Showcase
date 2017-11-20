import React, { Component } from 'react';

import Navigation from 'app/containers/Navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createDebounce from 'redux-debounced';

import reducer from 'app/reducers/RootReducer';
import httpRequestMiddleware from 'app/middlewares/httpRequestMiddleware';
import authenticationMiddleware from 'app/middlewares/authenticationMiddleware';
import geoDataMiddleware from 'app/middlewares/geoDataMiddleware';
import storageMiddleware from 'app/middlewares/storageMiddleware';
import processingExpensesMiddleware from 'app/middlewares/processingExpensesMiddleware';

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      processingExpensesMiddleware,
      authenticationMiddleware,
      storageMiddleware,
      httpRequestMiddleware,
      createDebounce(),
      thunkMiddleware
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

/**
 * Main application component
 */

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

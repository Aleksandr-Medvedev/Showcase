import { combineReducers } from 'redux';


import * as login from 'app/reducers/LoginReducer';
import * as registration from 'app/reducers/RegistrationReducer';
import * as authentication from 'app/reducers/AuthenticationReducer';

export default combineReducers(Object.assign(
  login,
  registration,
  authentication,
));

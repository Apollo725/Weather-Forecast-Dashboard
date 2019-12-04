import history from '../utils/helpers/historyHelper';
import {
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from '../constants/authActionType';
import { loginApi, forgotPasswordApi } from '../api/authAPI';
import { getUserWithToken } from '../utils/helpers/tokenHelper';

/* Login Action Section */

// request login
function requestLogin(item) {
  return {
    item,
    type: LOGIN_REQUEST,
  };
}

// login success
function receiveLogin(item, params) {
  return {
    item,
    type: LOGIN_SUCCESS,
    payload: params,
  };
}

// login failed
function loginError(item, message) {
  return {
    item,
    type: LOGIN_FAILURE,
    payload: message,
  };
}

// dispatch action when user login
export function loginAction(authData) {
  return async dispatch => {
    try {
      // Fetch response from API
      dispatch(requestLogin(LOGIN));
      const response = await loginApi(authData);
      console.log('login response', response);
      // validation with response
      if (response.data === 'OK') {
        const token = response.headers['access-token'];
        localStorage.setItem('token', token);
        const user = getUserWithToken(token);
        console.log('user info from token', JSON.parse(user.profile));
        // get user info from decoded jwt
        const userInfo = JSON.parse(user.profile);
        localStorage.setItem('userId', userInfo.userId);
        localStorage.setItem('universeName', userInfo.universeName);
        history.push({
          pathname: '/dashboard',
        });
        const params = { token };
        dispatch(receiveLogin(LOGIN, params));
      } else {
        dispatch(loginError(LOGIN, response.data));
      }
    } catch (error) {
      dispatch(loginError(LOGIN, error));
    }
  };
}

/* Logout Action Section */

// request logout
function requestLogout(item) {
  return {
    item,
    type: LOGOUT_REQUEST,
  };
}

// logout success
function receiveLogout(item) {
  return {
    item,
    type: LOGOUT_SUCCESS,
  };
}

// logout failure
function logoutError(item) {
  return {
    item,
    type: LOGOUT_ERROR,
  };
}
// dispatch action when user logout
export function logoutAction() {
  return async dispatch => {
    try {
      dispatch(requestLogout(LOGOUT));
      localStorage.removeItem('token');
      localStorage.removeItem('universeName');
      dispatch(receiveLogout(LOGOUT));
      history.push('/auth/login-page');
    } catch (error) {
      console.log('logoutAction error');
      dispatch(logoutError(LOGOUT));
    }
  };
}

/* Forgot Password Action */

// Action to save state of request to send forgot password
function requestForgotPassword(item) {
  return {
    item,
    type: FORGOT_PASSWORD_REQUEST,
  };
}

// Action to save state of success result of Forgot Passoword API
function receiveForgotPassword(item, data) {
  return {
    item,
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
}

// Action to save state of failure result of Forgot Password API
function forgotPasswordError() {
  return {
    item,
    type: FORGOT_PASSWORD_ERROR,
  };
}

// Action Creators to handle forgot password request
export function forgotPassword(email) {
  return async dispatch => {
    try {
      dispatch(requestForgotPassword(FORGOT_PASSWORD));
      const response = await forgotPasswordApi(email);
      if (response.data === 'OK') {
        dispatch(receiveForgotPassword(FORGOT_PASSWORD, response.data));
      } else {
        dispatch(forgotPasswordError(FORGOT_PASSWORD, response.data));
      }
    } catch (error) {
      dispatch(forgotPasswordError(FORGOT_PASSWORD, response.data));
    }
  };
}

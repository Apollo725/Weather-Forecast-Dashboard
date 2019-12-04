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

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  authData: {
    token: '',
  },
  errorMessage: '',
  forgotPasswordResult: '',
};

export default function authReducer(state = initialState, action) {
  if (action.item === LOGIN) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, isFetching: true, isAuthenticated: false };
      case LOGIN_SUCCESS:
        return { ...state, isFetching: false, isAuthenticated: true, authData: action.payload };
      case LOGIN_FAILURE:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === LOGOUT) {
    switch (action.type) {
      case LOGOUT_REQUEST:
        return { ...state, isFetching: true, isAuthenticated: false };
      case LOGOUT_SUCCESS:
        return { ...state, isFetching: false, isAuthenticated: false };
      case LOGOUT_ERROR:
        return { ...state, isFetching: false, isAuthenticated: false };
      default:
        return state;
    }
  } else if (action.item === FORGOT_PASSWORD) {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
        return { ...state, isFetching: true };
      case FORGOT_PASSWORD_SUCCESS:
        return { ...state, isFetching: false, forgotPasswordResult: action.payload };
      case FORGOT_PASSWORD_ERROR:
        return { ...state, isFetching: false, forgotPasswordResult: 'ERROR' };
      default:
        return state;
    }
  } else {
    return state;
  }
}

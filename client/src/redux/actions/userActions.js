import { userTypes } from '../constants';
import { apiClient } from '../../api';
import { makeRequest } from '../../utils';
import getHistory from 'react-router-global-history';

// General structure to avoid code reuse

export function login(credentials) {
  return (dispatch) => {
    return makeRequest(apiClient.login, credentials)
      .then((payload) => {
        if (payload.err) {
          dispatch({type: userTypes.ERROR_LOGIN, payload: payload.err});
        } else {
          dispatch({type: userTypes.SUCCESS_LOGIN, payload: payload.data});
          getHistory().push('/tracker')
        }
      });
  }
}

export function signup(credentials) {
  return (dispatch) => {
    return makeRequest(apiClient.signup, credentials)
      .then((payload) => {
        if (payload.err) {
          dispatch({type: userTypes.ERROR_SIGNUP, payload: payload.err});
        } else {
          dispatch({type: userTypes.SUCCESS_SIGNUP, payload: payload.data});
          getHistory().push('/login')
        }
      });
  }
}

// For Manually dispatching a signupError
export function signupError(message) {
  return (dispatch) => {
    dispatch({type: userTypes.ERROR_SIGNUP, payload: { message }});
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({type: userTypes.LOGOUT})
    return makeRequest(apiClient.logout);
  }
}


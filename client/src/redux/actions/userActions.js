import { userTypes } from '../constants';
import { apiClient } from '../../api';
import getHistory from 'react-router-global-history';

// General structure to avoid code reuse
async function makeRequest(requestFunc, requestArgs) {
  let payload = { err: null, data: null };
  try {
    const data = await requestFunc(requestArgs);
    payload.data = data
  } catch (error) {
    payload.err = error;
  }
  return payload;
}

export function login(credentials) {
  return (dispatch) => {
    return makeRequest(apiClient.login, credentials)
      .then((payload) => {
        if (payload.err) {
          dispatch({type: userTypes.ERROR_LOGIN, payload: payload.err});
        } else {
          dispatch({type: userTypes.SUCCESS_LOGIN, payload: payload.data});
          getHistory().push('/')
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


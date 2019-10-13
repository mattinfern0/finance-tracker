import { userTypes } from '../constants';
import { apiClient } from '../../api';

// General structure to avoid code reuse
async function makeRequest(requestFunc, requestArgs) {
  console.log('making request');
  let payload = { err: null, data: null };
  try {
    const data = await requestFunc(requestArgs);
    payload.data = data
    console.log('end try');
  } catch (error) {
    payload.err = error;
  }
  console.log(payload);
  return payload;
}

export function login(credentials) {
  return (dispatch) => {
    return makeRequest(apiClient.login, credentials)
      .then((payload) => {
        dispatch({type: userTypes.ATTEMPT_LOGIN, payload})
      });
  }
}

export function signup(credentials) {
  return makeRequest(userTypes.ATTEMPT_SIGNUP, apiClient.signup, credentials);
}

export function logout() {
  return (dispatch) => {
    return makeRequest(apiClient.logout)
      .then(() => {
        dispatch({type: userTypes.LOGOUT})
      });
  }
}


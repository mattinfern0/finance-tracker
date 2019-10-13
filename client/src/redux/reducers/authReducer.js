import { changeState } from '../../utils';
import { userTypes, errorTypes } from '../constants'
import { getCookie, eraseCookie } from '../../utils'; 

const initialState = {
  loggedIn: (getCookie('csrftoken') ? true : false) ,
  errLogin: null,
  errSignup: null,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case userTypes.SUCCESS_LOGIN:
      return changeState(state, {
        loggedIn: true,
        errLogin: null,
      })

    case userTypes.ERROR_LOGIN:
      eraseCookie('csrftoken');
      return changeState(state, {
        loggedIn: false,
        errLogin: action.payload.message,
      });

    case userTypes.LOGOUT:
      return changeState(state, {
        loggedIn: false
      });

    case userTypes.ERROR_SIGNUP:
      return changeState(state, {
        errSignup: action.payload.message,
      });

    case errorTypes.CLEAR_ERRORS:
      return changeState(state, {
        errSignup: null,
        errLogin: null,
      })

    default:
      return state;
  }
}
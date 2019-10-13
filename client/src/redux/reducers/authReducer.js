import { changeState } from '../../utils';
import { userTypes } from '../constants'
import { getCookie } from '../../utils'; 

const initialState = {
  loggedIn: (getCookie('csrftoken') ? true : false) ,
  errLogin: null,
  errSignup: null,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case userTypes.ATTEMPT_LOGIN:
      if (action.payload.err) {
        // set state to err message

        return changeState(state, {
          loggedIn: false
        });
      } else {

        return changeState(state, {
          loggedIn: true,
          errLogin: null,
        });
      }

    case userTypes.LOGOUT:
      return changeState(state, {
        loggedIn: false
      });

    default:
      return state;
  }
}
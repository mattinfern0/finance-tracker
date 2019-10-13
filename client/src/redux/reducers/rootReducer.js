import { combineReducers } from 'redux';
import { changeState } from '../../utils'
import authReducer from './authReducer';

const initialState = {
  articles: [],
  remoteArticles: [],
  loggedIn: false,
  errLogin: null,
  errSignup: null,
};

const rootReducer = combineReducers({
  authentication: authReducer,
});

export default rootReducer;
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  transactions: transactionReducer,
});

export default rootReducer;
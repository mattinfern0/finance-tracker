import { combineReducers } from 'redux';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';
import transViewReducer from './transViewReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  transactions: transactionReducer,
  transView: transViewReducer,
});

export default rootReducer;
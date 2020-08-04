import { combineReducers } from 'redux';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';
import transViewReducer from './transViewReducer';
import notificationReducer from './notificationReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  transactions: transactionReducer,
  transView: transViewReducer,
  notifications: notificationReducer,
});

export default rootReducer;
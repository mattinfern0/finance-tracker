import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers';
import thunk from 'redux-thunk';

// For react-dev tools
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk))
);

export default store;

import React from 'react';
import { Provider } from 'react-redux';
import { RootRouter } from './routes';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
}

export default App;

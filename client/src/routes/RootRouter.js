import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { SignUp, LogIn, Main } from '../react/pages';

export default function RootRouter() {
  return (
    <Router basename="/">
      <PrivateRoute exact path="/" component={Main} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </Router>
  );
}


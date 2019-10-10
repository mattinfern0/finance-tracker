import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { SignUp, LogIn } from '../react/pages';

export default function RootRouter() {
  return (
    <Router basename="/">
      <PrivateRoute exact path="/" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </Router>
  );
}


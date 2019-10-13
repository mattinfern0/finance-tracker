import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { ReactRouterGlobalHistory } from 'react-router-global-history';
import { SignUp, LogIn, Main, LogOut } from '../react/pages';

export default function RootRouter() {
  return (
    <BrowserRouter basename="/">
      <ReactRouterGlobalHistory />
      <PrivateRoute exact path="/" component={Main} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/logout" component={LogOut} />
    </BrowserRouter>
  );
}


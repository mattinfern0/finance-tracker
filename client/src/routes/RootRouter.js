import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { ReactRouterGlobalHistory } from 'react-router-global-history';
import { SignUp, LogIn, LogOut, Tracker, Tags, Planner, NotFound } from '../react/pages';

export default function RootRouter() {
  return (
    <BrowserRouter basename="/">
      <ReactRouterGlobalHistory />
      <Switch>
        <PrivateRoute exact path="/tracker" component={Tracker} />
        <PrivateRoute exact path="/tags" component={Tags} />
        <PrivateRoute exact path="/planner" component={Planner} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/logout" component={LogOut} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}


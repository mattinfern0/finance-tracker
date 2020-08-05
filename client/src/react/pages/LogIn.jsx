import React, { useEffect } from 'react';
import { LoginForm } from '../components/forms';
import { useSelector, useDispatch } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import { notificationActions } from '../../redux/actions';

import { userActions } from '../../redux/actions'

function LogIn() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const errLogin = useSelector(state => state.authentication.errLogin);

  // Clear error message on page load
  useEffect(() => {
    dispatch(notificationActions.clearNotification());
  }, []);

  const onSubmit = (data) => {
    dispatch(userActions.login(data))
  }

  if (loggedIn) {
    console.log('Redirecting');
    return <Redirect to="/tracker" />;
  }
  return (
    <div className="container-login">
      <h2>Log In</h2>
      <LoginForm
        className="form-auth"
        onSubmit={onSubmit}
      />
      {errLogin && (
        <div className="error">
          <p>{errLogin}</p>
        </div>
      )}
      
      <div>
        {'Don\'t have an account? '}
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default LogIn;
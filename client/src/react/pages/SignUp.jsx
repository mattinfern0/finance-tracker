import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpForm } from '../components/forms';
import { notificationActions } from '../../redux/actions'
import {Redirect, Link} from 'react-router-dom';

import { userActions } from '../../redux/actions'

function SignUp() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const errSignup = useSelector(state => state.authentication.errSignup);

  useEffect(() => {
    dispatch(notificationActions.clearNotification());
  }, []);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      dispatch(userActions.signupError('Passwords don\'t match'));
    } else {
      dispatch(userActions.signup(data));
    }
  }

  if (loggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container-signup">
        <h2>Sign Up</h2>
        <SignUpForm
          className='form-auth'
          onSubmit={onSubmit} 
        />
        {errSignup && (
          <div className="error">
            <p>{errSignup}</p>  
          </div>
        )}
        
        <div>
          {'Already have an account? '}
          <Link to="/login">Log In</Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
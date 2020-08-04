import React from 'react';
import { connect } from 'react-redux';
import { SignUpForm } from '../components/forms';
import { notificationActions } from '../../redux/actions'
import {Redirect, Link} from 'react-router-dom';

import {} from '../../'

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    errSignup: state.authentication.errSignup,
  }
}

function ConnectedSignUp(props) {
  React.useEffect(() => {
    props.clearNotification();
  }, []);

  if (props.loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container-signup">
      <h2>Sign Up</h2>
      <SignUpForm />
      {props.errSignup && (
        <div className="error">
          <p>{props.errSignup}</p>  
        </div>
      )}
      
      <div>
        {'Already have an account? '}
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

const mapDispatch = {
  clearNotification: notificationActions.clearNotification,
}

const SignUp = connect(mapStateToProps, mapDispatch)(ConnectedSignUp);
export default SignUp;
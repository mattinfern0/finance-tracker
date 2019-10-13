import React from 'react';
import { connect } from 'react-redux';
import { SignUpForm } from '../forms';
import { errorActions } from '../../redux/actions'
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
    props.clearErrors();
  }, []);

  if (props.loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <SignUpForm />
      <div className="error">
        <p>{props.errSignup}</p>  
      </div>
      <div>
        {'Already have an account? '}
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

const mapDispatch = {
  clearErrors: errorActions.clearErrors,
}

const SignUp = connect(mapStateToProps, mapDispatch)(ConnectedSignUp);
export default SignUp;
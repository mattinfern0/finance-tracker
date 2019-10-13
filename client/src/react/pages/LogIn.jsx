import React from 'react';
import { LoginForm } from '../forms';
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import { errorActions } from '../../redux/actions';

function ConnectedLogIn(props) {
  // Clear error message on page load
  React.useEffect(() => {
    props.clearErrors();
  }, []);

  if (props.loggedIn) {
    console.log('Redirecting');
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <h2>Log In</h2>
      <LoginForm />
      <div className="error">
        <p>{props.errLogin}</p>
      </div>
      <div>
        {'Don\'t have an account? '}
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    errLogin: state.authentication.errLogin,
  }
}

const mapDispatch = {
  clearErrors: errorActions.clearErrors,
}

const LogIn = connect(mapStateToProps, mapDispatch)(ConnectedLogIn)
export default LogIn;
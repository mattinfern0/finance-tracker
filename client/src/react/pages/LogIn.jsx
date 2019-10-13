import React from 'react';
import { LoginForm } from '../forms';
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

function mapStateToProps(state) {
  console.log(state);
  return {
    loggedIn: state.authentication.loggedIn,
  }
}

function ConnectedLogIn(props) {
  console.log("Props: ", props);
  if (props.loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <h2>Log In</h2>
      <LoginForm />
      <div>
        {'Don\'t have an account? '}
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

const LogIn = connect(mapStateToProps)(ConnectedLogIn)
export default LogIn;
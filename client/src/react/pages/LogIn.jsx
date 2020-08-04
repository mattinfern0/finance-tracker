import React from 'react';
import { LoginForm } from '../forms';
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import { notificationActions } from '../../redux/actions';

function ConnectedLogIn(props) {
  // Clear error message on page load
  React.useEffect(() => {
    props.clearNotification();
  }, []);

  if (props.loggedIn) {
    console.log('Redirecting');
    return <Redirect to="/" />;
  }
  return (
    <div className="container-login">
      <h2>Log In</h2>
      <LoginForm />
      {props.errLogin && (
        <div className="error">
          <p>{props.errLogin}</p>
        </div>
      )}
      
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
  clearNotification: notificationActions.clearNotification,
}

const LogIn = connect(mapStateToProps, mapDispatch)(ConnectedLogIn)
export default LogIn;
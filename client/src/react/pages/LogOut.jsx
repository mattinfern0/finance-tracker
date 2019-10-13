import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActions } from '../../redux/actions';

function ConnectedLogout(props) {
  props.logout();
  return <Redirect to="/login" />;
}

const mapDispatch = {
  logout: userActions.logout,
}

const LogOut = connect(null, mapDispatch)(ConnectedLogout);

export default LogOut;

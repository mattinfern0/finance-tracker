import React from 'react';
import { LoginForm } from '../forms';
import {Redirect, Link} from 'react-router-dom';

export default function LogIn() {
  return (
    <div class="login">
      <h2>Log In</h2>
      <LoginForm />
      <div>
        {'Don\'t have an account? '}
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
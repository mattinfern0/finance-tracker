import React from 'react';
import { SignUpForm } from '../forms';
import {Redirect, Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div class="signup">
      <h2>Sign Up</h2>
      <SignUpForm />
      <div>
        {'Already have an account? '}
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
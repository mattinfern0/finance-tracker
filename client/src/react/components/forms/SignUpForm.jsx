import React, { useState } from 'react';

function SignUpForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    
    props.onSubmit(data);
  }

  return (
    <form className={props.className} onSubmit={onSubmit}>
      <input
        type="text"
        value={username}
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPassword}
        name="confirm-password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
}

export default SignUpForm;

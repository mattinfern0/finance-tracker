import React, { useState } from 'react';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setUsername('');
    setPassword('');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    }

    props.onSubmit(data);
    resetForm();
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
      <input type="submit" value="Log In" />
    </form>
  );
}

export default LoginForm;

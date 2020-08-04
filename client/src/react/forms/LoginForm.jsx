import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/actions';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const resetForm = () => {
    setUsername('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    }

    dispatch(userActions.login(credentials));
    resetForm();
  }

  return (
    <form className="form-auth" onSubmit={handleSubmit}>
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

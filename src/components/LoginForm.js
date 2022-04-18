import React, { useState } from 'react';
import { setToken } from '../services/blogs';
import login from '../services/login';

export default function LoginForm({ setUser, setMessage, setError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      setUser(loggedUser);
      setToken(loggedUser.token);
      setUsername('');
      setPassword('');
      setError(false);
      setMessage(`${loggedUser.username} logged correctly`);
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setError(true);
      setMessage(err.response.data.error);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

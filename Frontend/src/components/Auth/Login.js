import React, { useState } from 'react';
import './Login.css';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    try {
      const response = await authService.login(user);
      localStorage.setItem('currentUserId', response.data.id);
      localStorage.setItem('currentUser', response.data.username);
      alert('Login Successful');
      navigate("/home");
    } catch (error) {
      alert('Login Failed');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-login" onClick={handleLogin}>
            Login
          </button>
          <button type="button" className="btn-signup" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

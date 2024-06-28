import React, { useState } from 'react';
import authService from '../../services/authService';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    try {
      await authService.register(user);
      alert('Sign Up Successful');
      navigate("/login");
    } catch (error) {
      alert('Sign Up Failed');
      console.error(error);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-signup">Sign Up</button>
          <button type="button" className="btn-login" onClick={() => navigate("/login")}>Login</button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default SignUp;

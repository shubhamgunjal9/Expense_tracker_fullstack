import React, { useState } from 'react';
import authService from '../../services/authService';
import './Signup.css'
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user ={
        'username' : username,
        'password' : password
    }
    try {
      await authService.register(user);
      alert('Sign Up Successful');
      navigate("/login")
    } catch (error) {
      alert('Sign Up Failed');
      console.log(username)
      console.log(password)
      console.log(user)
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
      <button type="login"><a href = "/login">Login</a></button>
      
    </form>
  );
}

export default SignUp;

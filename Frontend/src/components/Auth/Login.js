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
    const user ={
        'username' : username,
        'password' : password
    }

    try {
      await authService.login(user).then((r)=>{
        console.log(r.data.id)
        localStorage.setItem('currentUserId',r.data.id)
        localStorage.setItem('currentUser',r.data.username)
        
      })

      alert('Login Successful');
      navigate("/home")
    } catch (error) {
      alert('Login Failed');
      console.log(username)
      console.log(password)
      console.log(user)
    }
  };
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">username:</label>
                        <input type="email" id="email" name="username" required onChange={(e)=>{setUsername(e.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <button type="submit" className="btn-login" onClick={handleLogin}>Login</button>
                    <button type='signup' className='btn-signup' ><a href = "signup">Signup</a></button>
                </form>
            </div>
        </div>
    );
};

export default Login;

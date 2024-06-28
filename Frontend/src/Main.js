import React from 'react';
import './Main.css'; // Import your CSS file for styling

const Main = () => {
  return (
    <div className="main-container">
      <div className="main-content">
        <h1>Welcome to Our Application</h1>
        <p>This is a brief introduction about what our application does.</p>
        <div className="action-buttons">
          <button className="login-button"><a href='/login'>Login</a></button>
          <button className="signup-button"><a href="/signup">Sign Up</a></button>
        </div>
      </div>
    </div>
  );
};

export default Main;

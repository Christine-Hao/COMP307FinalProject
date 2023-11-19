import React, { useState } from 'react';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here we handle the login logic, possibly sending a request to our server
    console.log('Email:', email, 'Password:', password);
    // Implement login functionality here
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import './registration_styles.module.css'; // Assuming you have a separate CSS file for registration styles

const Registration = ({ onLoginClick }) => {
  // State variables for user's McGill email and password
  const [mcgillEmail, setMcgillEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handler for McGill email input change
  const handleMcgillEmailChange = (event) => {
    setMcgillEmail(event.target.value);
  };

  // Handler for password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('McGill Email:', mcgillEmail, 'Password:', password);
    // Implement registration logic here
    // For example, making a POST request to a registration API endpoint
  };

  // Rendering the registration form
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto">
          <div className="registration-container">
            <p className="registration-message">Register for an Account</p>
            <form className="registration-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={mcgillEmail}
                onChange={handleMcgillEmailChange}
                placeholder="Enter McGill email"
                required // Ensuring the McGill email is filled
              /><br/>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                required // Ensuring the password is filled
              /><br/>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>Already have an account? <span className="link-button" onClick={onLoginClick}>Login</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
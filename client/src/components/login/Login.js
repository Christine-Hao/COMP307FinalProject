import React, { useState, useEffect, useRef } from 'react'; 
import './Login_styles.css';

// The Login component, receiving 'onRegisterClick' as a prop for navigation
const Login = ({ onRegisterClick }) => {
  // State variables for Vanta effect, user email, and password
  const [vantaEffect, setVantaEffect] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Ref for the Vanta effect
  const vantaRef = useRef(null);

  // useEffect hook to initialize and clean up the Vanta effect
  useEffect(() => {
    // Initialize Vanta effect if it hasn't been set
    if (!vantaEffect) {
      setVantaEffect(window.VANTA.BIRDS({
        el: vantaRef.current,
        THREE: window.THREE, // Assumes THREE.js is included
        // Additional Vanta.js options can be set here
      }));
    }
    // Cleanup function to destroy Vanta effect when the component unmounts
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]); // Dependency array to ensure effect runs only once

  // Handlers for email and password input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);
    try {
      // Making a POST request to the login API endpoint
      const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}${process.env.REACT_APP_LOGIN_API}`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Handling the response
      if(response.ok){
        const data = await response.json();
        console.log("Login Successful", data);
        localStorage.setItem('token', data.token); // Storing the token
        // Additional successful login actions can be added here
      } else {
        console.log("Login failed:", await response.text());
      }
    } catch(error) {
      console.log("Error on logging in:", error);
    }
  };

  // Rendering the component
  return (
    <div className="row" ref={vantaRef}>
      <section className="col-sm-10 col-md-8 col-lg-6 login-container">
        <p className="welcome-message">Welcome to Double Bound</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">McGill Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            required
          /><br/>
          <label htmlFor="password">Password</label>
          <input
          id ="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            required
          /><br/>
          <button className='btn btn-primary' type="submit">Login</button>
        </form>
        <p>Don't have an account? <button className="link-button" onClick={onRegisterClick}>Register</button></p>
      </section>
    </div>
  );
};

export default Login; 
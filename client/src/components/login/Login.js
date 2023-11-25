import React, { useState, useEffect, useRef } from 'react'; 
import styles from './login_styles.module.css';

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
    <div className={styles.row} ref={vantaRef}> 
      <section className={`${styles.colSm10} ${styles.colMd8} ${styles.colLg6} ${styles.loginContainer}`}>
        <p className={styles.welcomeMessage}>Welcome to Double Bound</p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.emailInput} 
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            required
          /><br/>
          <input
            type="password"
            className={styles.passwordInput} 
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            required
          /><br/>
          <button type="submit" className={styles.submitButton}>Login</button> 
        </form>
        <p className={styles.registerPrompt}>Don't have an account? <button className={styles.linkButton} onClick={onRegisterClick}>Register</button></p>
      </section>
    </div>
  );
};

export default Login; 
import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef here
import './login_styles.css';



const Login = () => {
  const [vantaEffect, setVantaEffect] = useState(null); // Initialize vantaEffect with null
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const vantaRef = useRef(null); // Create a ref for the Vanta effect

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(window.VANTA.BIRDS({
        el: vantaRef.current,
        THREE: window.THREE, // Assuming THREE.js is included in your index.html
        // ... other Vanta.js options that we might want to use
      }));
    }
    // Cleanup function to destroy Vanta effect when the component unmounts
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]); // Dependency array ensures effect is only run once

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);
    try{
      // process.env.[name] is envrionment variables defined in ".env" file of the root directory 
      const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}${process.env.REACT_APP_LOGIN_API}`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:email,
          password: password,
        }),
      });

      // response stream can be read only once
      if(response.ok){
        const data = await response.json();
        console.log("Login Successful", data);
        // Handle successful login here (e.g., redirect, store token)
      } else{
        console.log("Login failed:", await response.text());

      }
    }catch(error){
      console.log("Error on logging in:" + error);
    }
    // Import verfiication code form Jiahao 
  };

  return (
    <div className="row" ref={vantaRef}>
      <section className="col-sm-10 col-md-8 col-lg-6 mx-auto login-container" >
        
        <p className="welcome-message">Welcome to Double Bound</p>
          <br></br>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
              required // Ensuring the input is filled
            /><br></br>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              required // Ensuring the input is filled
            /> <br></br>
            <button type="submit">Login</button>
          </form>

          <br></br>
          <p>Don't have an account? Register</p>
        
         
      </section>
    
    </div>
  );
};

export default Login;
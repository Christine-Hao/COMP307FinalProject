import React, { useState } from 'react';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  //The initial page that appears is the login pahe 
  const [currentPage, setCurrentPage] = useState('login');

    // Define the function to handle successful registration
    const handleRegistrationSuccess = () => {
      setCurrentPage('login');
    };

  return (
    <div>
      <Navbar />
      {currentPage === 'login' ? (
        <Login onRegisterClick={() => setCurrentPage('register')} />
      ) : (
        <Registration onLoginClick={() => setCurrentPage('login')}
        onRegistrationSuccess={handleRegistrationSuccess}
         />
      )}
    </div>
  );
};

export default App;
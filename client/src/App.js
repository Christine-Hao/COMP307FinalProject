import React, { useState } from 'react';

import Login from './components/login/Login';
import Registration from './components/registration/Registration';

function App() {
  //The initial page that appears is the login pahe 
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div>
      {currentPage === 'login' ? (
        <Login onRegisterClick={() => setCurrentPage('register')} />
      ) : (
        <Registration onLoginClick={() => setCurrentPage('login')} />
      )}
    </div>
  );
};

export default App;
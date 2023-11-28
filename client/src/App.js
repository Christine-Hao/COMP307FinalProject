import React, { useState } from 'react';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import SelectBoard from './components/select_board/SelectBoard';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login'); // Redirect back to login page after logout
  };

  if (isLoggedIn) {
    return (
      <div>
        <SelectBoard />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {currentPage === 'login' ? (
        <Login onRegisterClick={() => setCurrentPage('register')} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Registration onLoginClick={() => setCurrentPage('login')} />
      )}
    </div>
  );
}

export default App;
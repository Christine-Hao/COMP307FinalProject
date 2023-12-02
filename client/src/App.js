import React, { useState } from 'react';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import SelectBoard from './components/select_board/SelectBoard';
// import ViewBoard from './components/view_board/view_board';

function App() {

  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //To be added after implementing the selected board?
  //const [selectedBoardId, setSelectedBoardId] = useState(null); 


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('selectBoard'); // Set the current page to 'selectBoard'

  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login'); // Redirect back to login page after logout
    //setSelectedBoardId(null); // Reset selected board

  };

  const handleBoardSelect = (boardId) => {
    //setSelectedBoardId(boardId);
    //setCurrentPage('???'); // Change to board details page
  };

  const handleRegistrationSuccess = () => {
    setCurrentPage('login'); // Redirect to login page after successful registration
  };

  const renderContent = () => {

    switch (currentPage) {
      case 'login':
        return <Login onRegisterClick={() => setCurrentPage('register')} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <Registration onLoginClick={() => setCurrentPage('login')} onRegistrationSuccess={handleRegistrationSuccess} />;
      case 'selectBoard':
        return <SelectBoard onBoardSelect={handleBoardSelect} />;
      // case '???':
      //   return <??? boardId={selectedBoardId} />;
      default:
        return <div>Page not found</div>;
    }

  }

  return(
    <div>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      {renderContent()}
    </div>
  )

 
}

export default App;
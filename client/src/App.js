import React, { useState, useEffect} from 'react';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import SelectBoard from './components/select_board/SelectBoard';
// import ViewBoard from './components/view_board/view_board';
//import DiscussionBoard from './components/view_board/view_board';
import DiscussionBoard from './components/view_board/view_board_backup';

function App() {

  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null); 


  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token) // store the token
    setIsLoggedIn(true);
    setCurrentPage('selectBoard'); // Set the current page to 'selectBoard'

  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear the token upon logging out
    setIsLoggedIn(false);
    setCurrentPage('login'); // Redirect back to login page after logout
  };

  const handleBoardSelect = (boardId) => {
    setSelectedBoardId(boardId);
    setCurrentPage('discussionBoard'); // Change to board page
  };

  const handleRegistrationSuccess = () => {
    setCurrentPage('login'); // Redirect to login page after successful registration
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    // if the browser has token, then we consider that it is logged in
    if(token){
      setIsLoggedIn(true);
      setCurrentPage('selectBoard');
    }

  }, 
  [])

  const renderContent = () => {

    switch (currentPage) {
      case 'login':
        return <Login onRegisterClick={() => setCurrentPage('register')} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <Registration onLoginClick={() => setCurrentPage('login')} onRegistrationSuccess={handleRegistrationSuccess} />;
      case 'selectBoard':
        // return <SelectBoard onBoardSelect={handleBoardSelect} />;
        return <SelectBoard onBoardSelect={handleBoardSelect} />;
      case 'discussionBoard':
        return <DiscussionBoard boardId={selectedBoardId} />;
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
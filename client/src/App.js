import React, { useState, useEffect} from 'react';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import SelectBoard from './components/select_board/SelectBoard';
import DiscussionBoard from './components/view_board/view_board_backup';
import Navbar from './components/Navbar/Navbar';

function App() {

  //  return (
  //  <div>
  //  <SelectBoard />
  //  </div>)}

  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null); 


  const handleLoginSuccess = (token, userId) => {
    localStorage.setItem('token', token) // store the token
    localStorage.setItem('userId', userId);
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
    localStorage.setItem('selectedBoardId', boardId); // store the selected board ID
    setCurrentPage('discussionBoard'); // Change to board page
  };

  const handleWorkspacesClick = () => {
    setCurrentPage('selectBoard');
    localStorage.removeItem('selectedBoardId');
  };

  const handleRegistrationSuccess = () => {
    setCurrentPage('login'); // Redirect to login page after successful registration
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedBoardID = localStorage.getItem('selectedBoardId');
    // if the browser has token, then we consider that it is logged in
    if(token){

      setIsLoggedIn(true);

      if(savedBoardID){
        setSelectedBoardId(savedBoardID);
        setCurrentPage('discussionBoard');
      }else{
        setCurrentPage('selectBoard');
      }
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

  return (
    <div>
      {isLoggedIn && <Navbar handleLogout={handleLogout} handleWorkspacesClick={handleWorkspacesClick} />}
      {renderContent()}
    </div>
  );

 
}


export default App;
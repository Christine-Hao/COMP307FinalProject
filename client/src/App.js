import React, { useState, useEffect} from 'react';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import SelectBoard from './components/select_board/SelectBoard';
import DiscussionBoard from './components/view_board/ViewBoard';
import Navbar from './components/Navbar/Navbar';

function App() {
 
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

    setSelectedBoardId(null); // clear the id

    // clear everything we stored in the local storage
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId');
    localStorage.removeItem('selectedBoardId');
    
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
        return <SelectBoard onBoardSelect={handleBoardSelect} onLogout={handleLogout} />;
        case 'discussionBoard':
          // Render Navbar only on DiscussionBoard page
          return (
            <div>
              {isLoggedIn && <Navbar handleLogout={handleLogout} handleWorkspacesClick={handleWorkspacesClick} />}
              <DiscussionBoard boardId={selectedBoardId} />
            </div>
          );
        default:
          return <div>Page not found</div>;
      }
    }
  
    return (
      <div>
        {renderContent()}
      </div>
    );
  }
export default App;
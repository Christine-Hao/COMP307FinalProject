import React, { useState, useEffect } from 'react';
import './selectBoard_styles.css';

const SelectBoardPage = ( ) => {

  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {

    // Mock function to simulate fetching user's boards from a database
    // Replace with an actual API call
    const fetchUserBoards = async () => {

      const token = localStorage.getItem('token');
      try{

        const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_BOARDS_API}`, {
          method: 'GET', // GET is the default method?? maybe define it explictly..?
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if(response.ok){
          const data = await response.json();
          setBoards(data);
        }else{
          console.log("Failed to fetch boards!")
        }

      } catch(error){
        console.error("Error on the frontend/backend when fetching boards:", error);
      }
    };
    
    fetchUserBoards();

  }, );

  const handleUnsubscribe = async (boardId) => {

    const token = localStorage.getItem('token');
    try{
      const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_DELETEBOARD_API}/${boardId}`,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if(response.ok){
        // remove the board from the local state
        setBoards(boards.filter(board => board.id !== boardId));
      }else{
        console.log("Failed to delete board");
      }
    }catch(error){
      console.log("Failed to delete board!");
    }
  };

  const handleNewBoardNameChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleCreateBoard = async () => {

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_CREATBOARD_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({boardName: newBoardName})
      });

      if(response.ok){
        const newBoard = await response.json();
        setBoards([...boards, newBoard]);
        setNewBoardName(''); // reinitialize the new board name state.
        setShowModal(false); // close the modal.
      }else{
        console.log("Failed to create board...");
      }
      
    } catch (error) {
      console.log("Error happens on the frontend/backend:", error);
    }
  };

  return (
    <div className="select-board-outer">
      <h1>Your Discussion Boards</h1>
      <div className="board-list">
        {boards.map(board => (
          <div key={board.board_id} className="board-item">
            <span>{board.board_name}</span>
            <button onClick={() => handleUnsubscribe(board.board_id)} className="unsubscribe-btn">Unsubscribe</button>
          </div>
        ))}
      </div>
      <button onClick={() => setShowModal(true)} className="create-board-btn">Create New Board</button>
      
      {/* Custom Modal for Creating New Board */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Create a New Board</h2>
            <input
              type="text"
              value={newBoardName}
              onChange={handleNewBoardNameChange}
              placeholder="Board name"
              className="modal-input"
            />
            <button onClick={handleCreateBoard} className="modal-create-btn">Create</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectBoardPage;
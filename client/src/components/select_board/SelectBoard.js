import React, { useState, useEffect } from 'react';
import './selectBoard_styles.css';

const SelectBoardPage = ({ userId }) => {
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {
    // Mock function to simulate fetching user's boards from a database
    // Replace with an actual API call
    const fetchUserBoards = async () => {
      const response = await Promise.resolve([
        { id: 1, name: 'Board 1' },
        { id: 2, name: 'Board 2' },
        // ...other boards
      ]);
      setBoards(response);
    };
    
    fetchUserBoards();
  }, [userId]);

  const handleUnsubscribe = (boardId) => {
    // Mock function to simulate unsubscribing from a board
    // Replace with an actual API call
    setBoards(boards.filter(board => board.id !== boardId));
  };

  const handleNewBoardNameChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleCreateBoard = () => {
    // Mock function to simulate creating a new board
    // Replace with an actual API call
    // For now, just add the new board to the local state
    const newBoard = { id: boards.length + 1, name: newBoardName };
    setBoards([...boards, newBoard]);
    setNewBoardName(''); // Reset the input field
    setShowModal(false); // Close the modal
  };

  return (
    <div className="select-board-outer">
      <h1>Your Discussion Boards</h1>
      <div className="board-list">
        {boards.map(board => (
          <div key={board.id} className="board-item">
            <span>{board.name}</span>
            <button onClick={() => handleUnsubscribe(board.id)} className="unsubscribe-btn">Unsubscribe</button>
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
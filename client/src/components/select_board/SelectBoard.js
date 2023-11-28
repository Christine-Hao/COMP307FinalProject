import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router for navigation

function SelectBoard() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetching data for the user's boards
    // Replace this actual fetch call to your backend or membership table
    const mockBoards = [
      { id: 1, name: 'Board 1' },
      { id: 2, name: 'Board 2' },
      { id: 3, name: 'Board 3' }
      // ... more boards
    ];
    setBoards(mockBoards);
  }, []);

  return (
    <div>
      <h1>Welcome to Your Discussion Boards</h1>
      <ul>
        {boards.map(board => (
          <li key={board.id}>
            <Link to={`/board/${board.id}`}>{board.name}</Link> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectBoard;
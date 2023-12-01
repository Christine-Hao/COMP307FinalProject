import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // assuming you're using react-router for navigation

function SelectBoard({ onBoardSelect }) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetching data for the user's boards
    // Replace this actual fetch call to your backend or membership table
    const fetchBoards = async () => {
      const token = localStorage.getItem("token");
      if(token){
        try{
          const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_BOARDS_API}`, {
            headers: {'Authorization' : "Bearer ${token}"}
          });
          if (response.ok){
            const data = await response.json();
            setBoards(data);
          }else{
            console.log("Failed to fetch boards!");
          }
        }catch(error){
          console.error("Catch: failed when fetching boards. The error:", error);
        }
      }
    };

    //fetchBoards();

    
    // example boards
    const mockBoards = [
      { id: 1, name: 'Board 1' },
      { id: 2, name: 'Board 2' },
      { id: 3, name: 'Board 3' }
      // ... more boards
    ];
    setBoards(mockBoards);
    
  }, []);

  const handleBoardClick = (boardId) => {
    // When a board is clicked, call onBoardSelect with the board's id
    onBoardSelect(boardId);

  }

  return (
    <div>
      <h1>Welcome to Your Discussion Boards</h1>
      <ul>
        {boards.map(board => (
          <li key={board.id} onClick={() => handleBoardClick(board.id)}>
            { /* <Link to={`/board/${board.id}`}>{board.name}</Link>  */}
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectBoard;
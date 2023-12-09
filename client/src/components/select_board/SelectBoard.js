import React, { useState, useEffect } from "react";
import "./selectBoard_styles.css";

const SelectBoardPage = ({ onBoardSelect }) => {
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  useEffect(() => {
    const fetchUserBoards = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_BOARDS_API}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setBoards(data);
        } else {
          console.error("Failed to fetch boards:", data.message);
        }
      } catch (error) {
        console.error("Error when fetching boards:", error);
      }
    };

    fetchUserBoards();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleBoardSelect = (boardId, event) => {
    event.stopPropagation();
    onBoardSelect(boardId);
  };

  const handleDelete = async (boardId, event) => {
    event.stopPropagation();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_DELETEBOARD_API}/${boardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {

        setBoards(boards.filter((board) => board.board_id !== boardId));
        
      } else {
        console.error("Failed to delete board:", await response.json().message);
      }
    } catch (error) {
      console.error("Error when deleting board:", error);
    }
  };

  const handleNewBoardNameChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleCreateBoard = async () => {
    if (newBoardName.length > 50) {
      alert("Board name cannot exceed 50 characters.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_CREATBOARD_API}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ boardName: newBoardName }),
        }
      );

      if (response.ok) {
        const newBoard = await response.json();

        newBoard.is_owner = true;
        setBoards([...boards, newBoard]);

        setNewBoardName("");
        setShowModal(false);
      } else {
        console.error("Failed to create board:", await response.json().message);
      }
    } catch (error) {
      console.error("Error when creating board:", error);
    }
  };

  return (
    <div className="select-board-outer">
      <div className="container sb-wrapper">
        <div className="registration-row row">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto">
            <h1>Your Discussion Boards</h1>
            <div className="board-list">
              {boards.map((board) => (
                <div
                  key={board.board_id}
                  className="board-item"
                  onClick={(e) => handleBoardSelect(board.board_id, e)}
                >
                  <span>{board.board_name}</span>
                  {/* Delete button should be rendered ONLY when board.is_owner is true! (i.e. the user is the owner of the board) */}
                  {board.is_owner && (
                    <button
                      onClick={(e) => handleDelete(board.board_id, e)}
                      className="unsubscribe-btn"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="create-board-btn"
            >
              Create New Board
            </button>

            {/* Custom Modal for Creating New Board */}
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <span
                    className="modal-close"
                    onClick={() => setShowModal(false)}
                  >
                    &times;
                  </span>
                  <h2>Create a New Board</h2>
                  <input
                    type="text"
                    value={newBoardName}
                    onChange={handleNewBoardNameChange}
                    placeholder="Board name"
                    className="modal-input"
                  />
                  <button
                    onClick={handleCreateBoard}
                    className="modal-create-btn"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBoardPage;

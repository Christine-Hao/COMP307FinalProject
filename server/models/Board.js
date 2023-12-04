// We are in: server/models/boardModel.js
import pool from '../config/db.js';
//const pool = require('../config/db.mjs');


export async function findByUserId(userId){   

  // give "boards" an alias called "b", and "board_members" an alias called "bm"
  // inner join -> all records in boards with the board_members table
  // join condition -> b.board_id = bm.board_id
  // where statement -> filters results, include only boards of specified user_id
  const result = await pool.query(
    'SELECT b.*, (b.user_id = $1) as is_owner FROM boards b INNER JOIN board_members bm ON b.board_id = bm.board_id WHERE bm.user_id = $1',
    [userId]
  );
  return result.rows;
};

export async function findByBoardId(boardID) {

  const result = await pool.query("SELECT * FROM boards WHERE board_id = $1", [boardID]);

  return result.rows[0];
};

export async function createBoardModel(userID, boardName){

    const newBoard = await pool.query(
      "INSERT INTO boards (board_name, user_id) VALUES ($1, $2) RETURNING *",
      [boardName, userID]
    );

    console.log("In Board.js createBoard, the new board in Modal:", newBoard.rows);

    await pool.query(
      "INSERT INTO board_members (board_id, user_id) VALUES ($1, $2)",
      [newBoard.rows[0].board_id, userID]
    );


    // create default channels ??

    return newBoard.rows[0];

};

export async function deleteBoardModel(boardID){

    await pool.query("DELETE FROM board_members WHERE board_id = $1", [boardID]);
    await pool.query("DELETE FROM boards WHERE board_id = $1", [boardID]);
    // also delete from channels, channel_members ? need to delete from messages ??
};

export async function addMember(boardID, userID){
    await pool.query(
      "INSERT INTO board_members (board_id, user_id) VALUES ($1, $2)",
      [boardID, userID]
    );
};

export async function removeMember(boardID, userID){
    await pool.query(
      "DELETE FROM board_members WHERE board_id = $1 AND user_id = $2",
      [boardID, userID]
    )
};


//export default BoardModel;
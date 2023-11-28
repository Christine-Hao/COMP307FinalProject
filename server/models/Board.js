// We are in: server/models/boardModel.js

const pool = require('../config/db');

const BoardModel = {
  findByUserId: async (userId) => {
    const result = await pool.query('SELECT * FROM boards WHERE user_id = $1', [userId]);
    return result.rows;
  },

  createBoard: async (boardName) => {
    const newBoard = await pool.query("INSERT INTO boards (boardName) VALUES ($1) RETURNING *",
    [boardName]);

    await pool.query(
      "INSERT INTO board_members (boardID, userID) VALUES ($1, $2)",
      [newBoard.rows[0].boardID, newBoard.rows[0].userId]
    );

    return newBoard.rows[0];

  },

  deleteBoard: async (boardID) => {
    await pool.query("DELETE FROM board_members WHERE boardID = $1", [boardID]);
    await pool.query("DELETE FROM boards WHERE boardID = $1", [boardID]);
  }
};


module.exports = BoardModel;
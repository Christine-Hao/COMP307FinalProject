// We are in: server/models/boardModel.js

const pool = require('../config/db');

const BoardModel = {
  findByUserId: async (userId) => {
    const result = await pool.query('SELECT * FROM boards WHERE user_id = $1', [userId]);
    return result.rows;
  },

};

module.exports = BoardModel;
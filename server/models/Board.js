// We are in: server/models/boardModel.js
import pool from '../config/db.js';

const BoardModel = {

  async findByUserId(userId){   
  
    // give "boards" an alias called "b", and "board_members" an alias called "bm"
    // inner join -> all records in boards with the board_members table
    // join condition -> b.board_id = bm.board_id
    // where statement -> filters results, include only boards of specified user_id
    const result = await pool.query(
      'SELECT b.*, (b.user_id = $1) as is_owner FROM boards b INNER JOIN board_members bm ON b.board_id = bm.board_id WHERE bm.user_id = $1',
      [userId]
      );
      return result.rows;
    },
    
    async findBoardNameById(boardID) {
      try {
        const result = await pool.query("SELECT * FROM boards WHERE board_id = $1", [boardID]);
        return result.rows[0];
      } catch (error) {
        throw error;
      }
    },
    
  async getBoardMembersModel(boardID){
  
    const channelResult = await pool.query(
      "SELECT channel_id FROM channels WHERE board_id = $1",
      [boardID]
    );
    const channelIDs = channelResult.rows.map(row => row.channel_id);
  
    // console.log("Inside Board model, getBoardMembersModel, after getting channel ids");
  
    const membersResult = await pool.query(
      `SELECT DISTINCT u.id, u.email, u.username, cm.is_owner
      FROM users u
      INNER JOIN channel_members cm ON u.id = cm.user_id
      WHERE cm.channel_id = ANY($1)`,
      [channelIDs]
    );
  
    return membersResult.rows;
  
  },
  
  async isUserAlreadyMember(boardID, userID) {
  
    const result = await pool.query(
        "SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2",
        [boardID, userID]
    );
    return result.rowCount > 0;
  },
  
  async createBoardModel(userID, boardName){
      
      const newBoard = await pool.query(
        "INSERT INTO boards (board_name, user_id) VALUES ($1, $2) RETURNING *",
        [boardName, userID]
        );
        
        console.log("In Board.js createBoard, the new board in Modal:", newBoard.rows);
        
        await pool.query(
          "INSERT INTO board_members (board_id, user_id) VALUES ($1, $2)",
          [newBoard.rows[0].board_id, userID]
        );
          
      return newBoard.rows[0];
  
  },
  
  
  async deleteBoardModel(boardID){
    await pool.query("DELETE FROM board_members WHERE board_id = $1", [boardID]);
    await pool.query("DELETE FROM boards WHERE board_id = $1", [boardID]);
  },
  
  async addMember(boardID, userID){
      await pool.query(
        "INSERT INTO board_members (board_id, user_id) VALUES ($1, $2)",
        [boardID, userID]
      );
  },
  
  async removeMember(boardID, userID){
      await pool.query(
        "DELETE FROM board_members WHERE board_id = $1 AND user_id = $2",
        [boardID, userID]
      )
  },

}

export default BoardModel;
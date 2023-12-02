//const pool = require('../config/db.mjs');
import pool from '../config/db.js';


export const createChannel = async (boardID, channelName) => {
    const result = await pool.query(
        "INSERT INTO channels (channel_name, board_id) VALUES ($1, $2) RETURNING *",
        [channelName, boardID]
    );

    return result.rows[0];

};

    // add a member to the channel
export const addChannelMember = async (channelID, userID, isOwner = false) => {
    await pool.query(
        "INSERT INTO channel_members (channel_id, user_id, is_owner) VALUES ($1, $2, $3)",
        [channelID, userID, isOwner]
    );
};

    // find the default channels
export const findDefaultChannel = async(boardID) => {
    const result = await pool.query(
        "SELECT * FROM channels WHERE board_id = $1 AND channel_name = 'general' ",
        [boardID]
    );
    return result.rows[0];
};

    // remove a member from all channels of a board
export const removeAllChannelsMember = async (boardID, userID) => {
    // first, select all channels that the user has
    // secondly, narrow-down the range of channels to those that the user joins in a particular board
    // then, remove those channels from the database.
    await pool.query(
        "DELETE FROM channel_members WHERE user_id = $1 AND channel_id IN (SELECT channel_id FROM channels WHERE board_id = $2)",
        [userID, boardID]
    );
}
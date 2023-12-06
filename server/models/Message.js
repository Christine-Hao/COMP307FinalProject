// We are now at /server/models/Message.js
import pool from '../config/db.js';


// save message to default channel
export async function saveMessage(content, channelID, userID) {
    
    
    const result = await pool.query(
        "INSERT INTO messages (content, channel_id, user_id) VALUES ($1, $2, $3) RETURNING *",
        [content, channelID, userID]
        );
        return result.rows[0];
}

export async function getMessagesByChannel(channelId) {
    const result = await pool.query(
        `SELECT m.message_id, m.content, m.channel_id, u.username 
        FROM messages m
        JOIN users u ON m.user_id = u.id
        WHERE m.channel_id = $1;`,
        [channelId]
    );
    return result.rows;
    // const result = await pool.query(
    //     "SELECT * FROM messages WHERE channel_id = $1",
    //     [channelId]
    // );
    return result.rows;
}


// export async function saveMessage(content, boardID, userId) {
//     const defaultChannel = await pool.query(
//         "SELECT * FROM channels WHERE board_id = $1",
//         [boardID]
//     );

//     const result = await pool.query(
//         "INSERT INTO messages (content, channel_id, user_id) VALUES ($1, $2, $3) RETURNING *",
//         [content,defaultChannel.rows[0].channel_id, userId]
//     );
//     return result.rows[0];
// }

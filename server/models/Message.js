// We are now at /server/models/Message.js
import pool from '../config/db.js';


export async function saveMessage(content, channelId, userId) {
    const result = await pool.query(
        "INSERT INTO messages (content, channel_id, user_id) VALUES ($1, $2, $3) RETURNING *",
        [content, channelId, userId]
    );
    return result.rows[0];
}

export async function getMessagesByChannel(channelId) {
    const result = await pool.query(
        "SELECT * FROM messages WHERE channel_id = $1",
        [channelId]
    );
    return result.rows;
}
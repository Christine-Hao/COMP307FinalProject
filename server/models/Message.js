// We are now at /server/models/Message.js
import pool from '../config/db.js';

const MessageModel = {
    // save message to default channel
    async saveMessage(content, channelID, userID) {
        
        const savedMessage = await pool.query(
            "INSERT INTO messages (content, channel_id, user_id) VALUES ($1, $2, $3) RETURNING *",
            [content, channelID, userID]
        );

        const sender = await pool.query(
            "SELECT username FROM users WHERE id = $1",
            [userID]
        )

        return {
            ...savedMessage.rows[0],
            username: sender.rows[0].username
        };
    },

    async getMessagesByChannel(channelId) {
        const result = await pool.query(
            `SELECT m.message_id, m.content, m.channel_id, m.created_at, u.username
            FROM messages m
            JOIN users u ON m.user_id = u.id
            WHERE m.channel_id = $1
            ORDER BY m.created_at ASC`,
            [channelId]
        );

        return result.rows;
    },

    async deleteMessagesByChannelID(channelID){
        await pool.query("DELETE FROM messages WHERE channel_id = $1", [channelID]);
    }
}

export default MessageModel;
// This file: defines how to interact with the users table in PostgreSQL database.

const pool = require("../config/db");

const User = {
    // takes a username and runs a SQL query to find a matching user
    findByUsername: async (username) => {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        return result.rows[0];
    }
    // ...... additional stuff ......

    // To be Done: add user creation.
}

module.exports = User;

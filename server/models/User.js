// This file: defines how to interact with the users table in PostgreSQL database.

const pool = require("../config/db");

// define a User object with some functions.
const User = {
    // takes a username and runs a SQL query to find a matching user
    findByUsername: async (username) => {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        return result.rows[0];
    },
    findByEmail: async (email) => {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    },

    createUser: async (username, hashedPassword, email) => {
        const result = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id",
            [username, hashedPassword, email]
        );
    }
}

module.exports = User;

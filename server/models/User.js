// This file: defines how to interact with the users table in PostgreSQL database.
import pool from '../config/db.js';

const UserModel = {

    // define a User object with some functions.
    async findByUsername (username){
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        return result.rows[0];
    },

    async findByEmail(email) {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    },

    async createUser(fullname, username, hashedPassword, email) {
        const result = await pool.query(
            "INSERT INTO users (fullname, username, password, email) VALUES ($1, $2, $3, $4) RETURNING id",
            [fullname, username, hashedPassword, email]
        );

        return result.rows[0];
    },
}
export default UserModel;
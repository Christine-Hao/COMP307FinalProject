// This file: defines how to interact with the users table in PostgreSQL database.
import pool from '../config/db.js';

// define a User object with some functions.
export async function findByUsername (username){
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows[0];
};

export async function findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

export async function createUser(fullname, username, hashedPassword, email) {
    const result = await pool.query(
        "INSERT INTO users (fullname, username, password, email) VALUES ($1, $2, $3, $4) RETURNING id",
        [fullname, username, hashedPassword, email]
    );

    return result.rows[0];
};
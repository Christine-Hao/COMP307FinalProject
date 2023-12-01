
// imports the Pool class from the pg module.
// Pools manage multiple client connections
import { Pool } from 'pg';

// a new instance of Pool is created with a configuration object. 
// This object includes the details required to connect to  PostgreSQL database,
// such as the username, password, database name, host, and port.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

// make it available to other files in the Node.js applicaiton.
// So we can use it to query databse from other parts of the applicaiton
export default pool;
// entry point of Node.js server
// sets up the Express server with middleware(e.g. cors and express.json())
// cors means Cross-Origin Resource Sharing, allowing frontend to communicate with the backend.
// This file tells the server to use routes defined in users.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import userRoutes from "./routes/users.js";
import discussionRoutes from './routes/discussionRoutes.js';

const app = express();

// the middlewares
app.use(cors());
app.use(express.json());

// prefix: /api/users.
// if userRoutes has a route defined as "/login", full path: /api/users/login
app.use('/api/users', userRoutes);
app.use('/api/boards', discussionRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

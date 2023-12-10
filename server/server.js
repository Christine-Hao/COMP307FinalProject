/* Description:
1. entry point of Node.js server
2. sets up the Express server with middleware(e.g. cors and express.json())
3. This file tells the server to use routes manually defined in the routes folder
4. Sets up socket.io connection with the client, listens & emits incoming messages and store it in the database.
*/
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';

import userRoutes from "./routes/userRoutes.js";
import discussionRoutes from './routes/discussionRoutes.js';
import { handleSaveMessage } from './controllers/messageController.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        // origin: "http://localhost:3000", // testing on local
        origin: `https://doublebound.onrender.com`,
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// prefix: /api/users.
// if userRoutes has a route defined as "/login", full path: /api/users/login
app.use('/api/users', userRoutes);
app.use('/api/boards', discussionRoutes);

// Socket.IO setup
io.use((socket, next) => {
    
    // token is sent as a parameter
    const token = socket.handshake.query.token;
    if(!token){
        return next(new Error("Authentication error: No token provided"));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();

    } catch (error) {
        next(new Error("Authentication error: Invalid token"));
    }
    
});

io.on('connection', (socket) => {

    console.log("A new client is connected with socket id:", socket.id);

    socket.on('joinBoard', (boardID) => {
        socket.join(boardID);
        console.log(`User joined board: ${boardID}`);
    });

    socket.on('message', async(boardID, content) => {
        try {

            const userID = socket.user.userID;
            // console.log("user id:", userID);
            // console.log("board id:", boardID);
            // console.log("content:", content);

            // save the newly received message to the database
            const message = await handleSaveMessage(content, boardID, userID);

            // emit the newly received message to clients connected to the channel.
            io.to(boardID).emit('newMessage', message);

        } catch (error) {
            console.error("Error on server when saving message:", error);
        }
    })

    socket.on('disconnect', () => {
        console.log("A client is disconnected", socket.id)
    });
});

// speciallized port number or default port number
const port = process.env.PORT || 3000;


httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
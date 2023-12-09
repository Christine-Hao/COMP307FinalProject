// entry point of Node.js server
// sets up the Express server with middleware(e.g. cors and express.json())
// cors means Cross-Origin Resource Sharing, allowing frontend to communicate with the backend.
// This file tells the server to use routes defined in users.js
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
        // origin: "http://localhost:3000", //replace when on remote
        origin: `https://doublebound.onrender.com`,
        methods: ["GET", "POST"]
    }
});

// the middlewares
app.use(cors());
app.use(express.json());

// prefix: /api/users.
// if userRoutes has a route defined as "/login", full path: /api/users/login
app.use('/api/users', userRoutes);
app.use('/api/boards', discussionRoutes);

// Socket.IO setup
io.use((socket, next) => {
    // assume token is sent as a parameter
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
            // assume saveMessage is implemented later in messageController?
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


const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
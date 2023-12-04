// entry point of Node.js server
// sets up the Express server with middleware(e.g. cors and express.json())
// cors means Cross-Origin Resource Sharing, allowing frontend to communicate with the backend.
// This file tells the server to use routes defined in users.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';

import userRoutes from "./routes/users.js";
import discussionRoutes from './routes/discussionRoutes.js';
import { handleSaveMessage, handleGetMessages } from './controllers/messageController.js';
// import { saveMessage } from './models/Message.js';
import jwt from 'jsonwebtoken';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: "URL",
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
    
    // verifyToken(token, (err, user) => {
    //     if(err) return next(new Error("Authentication error"));
    //     socket.user = user;
    //     next();
    // });
});

io.on('connection', (socket) => {
    
    console.log("A new client is connected with socket id:", socket.id);

    socket.on('joinBoard', (boardID) => {
        socket.join(boardID);
        console.log(`User joined board: ${boardID}`);
    });

    socket.on('message', async({channelID, content}) => {
        try {
            // assume saveMessage is implemented later in messageController?
            const userID = socket.user.id;
            const message = await handleSaveMessage({boardID, content, userID});
            io.to(channelID).emit('message', message);

        } catch (error) {
            console.error("Error in saving message:", error);
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

//app.listen(port, () => console.log(`Server running on port ${port}`));

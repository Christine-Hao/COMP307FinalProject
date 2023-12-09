// Inside: /server/routes/discussionRoutes.js


import { Router } from 'express';
const discussionRoutes = Router();
import { getBoards, createBoard, addBoardMember, removeBoardMember, deleteBoard, getBoardMembers, getBoardNameById } from '../controllers/discussionController.js';
import {handleGetMessages} from '../controllers/messageController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

// api prefix in server.js: /api/boards/

/*full server side api:
GET:
api/boards/userBoards
api/boards/userBoards/members/:boardID
api/boards/userBoards/messages/:boardID

POST:
api/boards/userBoards/createBoard
api/boards/userBoards/addMember

DELETE:
api/boards/userBoards/deleteBoard/:boardID
api/boards/userBoards/removeMember

*/

discussionRoutes.get('/userBoards', verifyToken, getBoards);
discussionRoutes.get('/userBoards/members/:boardID', verifyToken, getBoardMembers);
discussionRoutes.get('/userBoards/messages/:boardID', verifyToken, handleGetMessages);
discussionRoutes.get('/userBoards/name/:boardID', verifyToken, getBoardNameById);

discussionRoutes.delete('/userBoards/deleteBoard/:boardID', verifyToken, deleteBoard);
discussionRoutes.delete('/userBoards/removeMember', verifyToken, removeBoardMember);


discussionRoutes.post('/userBoards/createBoard', verifyToken, createBoard);
discussionRoutes.post('/userBoards/addMember', verifyToken, addBoardMember);


export default discussionRoutes;
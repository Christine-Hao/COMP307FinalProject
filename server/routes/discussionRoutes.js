// Inside: /server/routes/discussionRoutes.js


import { Router } from 'express';
const discussionRoutes = Router();
import { getBoards, createBoard, addBoardMember, removeBoardMember, deleteBoard, getBoardMembers, getBoardNameById } from '../controllers/discussionController.js';
import {handleGetMessages} from '../controllers/messageController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

// api prefix in server.js: /api/boards/

/*our full list of server side api, related to discussion boards(both select-board & individual board):
GET:
api/boards/userBoards                         -> get the boards of a user
api/boards/userBoards/members/:boardID        -> get the board members
api/boards/userBoards/messages/:boardID       -> get the messages of a board
api/boards/userBoards/name/:boardID           -> get a specific board

POST:
api/boards/userBoards/createBoard             -> create a board
api/boards/userBoards/addMember               -> add members to the board

DELETE:
api/boards/userBoards/deleteBoard/:boardID   -> delete a board
api/boards/userBoards/removeMember           -> delete a member to the board

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
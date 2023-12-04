// Inside: /server/routes/discussionRoutes.js

// server/routes/discussionRoutes.js

// api prefix in server.js: /api/boards

import { Router } from 'express';
const discussionRoutes = Router();
import { getBoards, createBoard, addBoardMember, removeBoardMember, deleteBoard } from '../controllers/discussionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


/*server side api:
api/boards/userBoards
api/boards/userBoards/createBoard
api/boards/userBoards/deleteBoard/:boardID
api/boards/userBoards/addMember
api/boards/userBoards/removeMember

*/

discussionRoutes.get('/userBoards', verifyToken, getBoards);

discussionRoutes.post('/userBoards/createBoard', verifyToken, createBoard);

discussionRoutes.delete('/userBoards/deleteBoard/:boardID', verifyToken, deleteBoard);

discussionRoutes.post('/userBoards/addMember', verifyToken, addBoardMember);

discussionRoutes.post('/userBoards/removeMember', verifyToken, removeBoardMember);

// Other discussion board-related routes...

export default discussionRoutes;
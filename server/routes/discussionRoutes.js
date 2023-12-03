// Inside: /server/routes/discussionRoutes.js

// server/routes/discussionRoutes.js

// api prefix in server.js: /api/boards

import { Router } from 'express';
const router = Router();
import { getBoards, createBoard, addBoardMember, removeBoardMember, deleteBoard } from '../controllers/discussionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


/*server side api:
api/boards/userBoards
api/boards/userBoards/createBoard
api/boards/userBoards/deleteBoard/:boardID
api/boards/userBoards/addMember
api/boards/userBoards/removeMember

*/

router.get('/userBoards', verifyToken, getBoards);

router.post('/userBoards/createBoard', verifyToken, createBoard);

router.delete('/userBoards/deleteBoard/:boardID', verifyToken, deleteBoard);

router.post('/userBoards/addMember', verifyToken, addBoardMember);

router.post('/userBoards/removeMember', verifyToken, removeBoardMember);

// Other discussion board-related routes...

export default router;
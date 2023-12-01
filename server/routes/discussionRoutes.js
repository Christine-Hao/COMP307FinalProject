// Inside: /server/routes/discussionRoutes.js

// server/routes/discussionRoutes.js

// api prefix in server.js: /api/boards

const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const authMiddleware = require('../middleware/authMiddleware');


/*server side api:
api/boards/userBoards
api/boards/createBoard
api/boards/userBoards/addMember
api/boards/userBoards/removeMember
*/
router.get('/userBoards', authMiddleware.verifyToken, discussionController.getBoards);

router.post('/userBoards/createBoard', authMiddleware.verifyToken, discussionController.createBoard);

router.post('/userBoards/addMember', authMiddleware.verifyToken, discussionController.addBoardMember);
router.post('/userBoards/removeMember', authMiddleware.verifyToken, discussionController.removeBoardMember);

// Other discussion board-related routes...

module.exports = router;
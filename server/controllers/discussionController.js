// Inside: /server/controllers/discussionController.js

// query database for discussion boards of the user.
exports.getBoards = async (req, res) => {
    // use a model function to get boards by user ID
    try {
      const boards = await BoardModel.findByUserId(req.user.id);
      res.json(boards);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving discussion boards.' });
    }
};



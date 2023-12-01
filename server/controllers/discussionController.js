// Inside: /server/controllers/discussionController.js

const BoardModel = require("../models/Board");

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

exports.createBoard = async (req, res) => {
  const{ boardName } = req.body;
  try{

    const newBoard = await BoardModel.createBoard(boardName, req.user.id);
    res.json(newBoard);

  }catch(error){
    res.status(500).json({message: "Error when creating a new board -- discussionControllers"});
  }

}

exports.deleteBoard = async (req, res) => {
  const {boardID} = req.params;
  try{
    await BoardModel.deleteBoard(boardID);
    res.json({message: "Board deleted successfullly"});
  }catch (error){
    res.status(500).json({message: "Error deleting the board."});
  }
}

exports.addBoardMember = async (req, res) =>{
  const {boardID, userID} = req.body;
  try{
    await BoardModel.addMember(boardID, userID);
    res.json({message: "Member added to board successfully"});
  }catch(error){
    res.status(500).json({message:"Error adding members to board."});
  }

}

exports.removeBoardMember = async(req, res) => {
  const {boardID, userID} = req.body;
  try{
    await BoardModel.removeMember(boardID, userID);

    // also remove from channels, channel_members??
    res.json({message:"Member removed from board successfully"});


  }catch(error){

    res.status(500).json({message: "Error happens in controller when removing members from the board."});

  }
}




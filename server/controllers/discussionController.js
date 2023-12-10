// Inside: /server/controllers/discussionController.js

import UserModel from "../models/User.js";
import BoardModel from "../models/Board.js";
import ChannelModel from "../models/Channel.js";
import MessageModel from "../models/Message.js";


export async function getBoards(req, res) {
  
  try {

    // we used the authMiddleware to decode the token and assign the decoded to req.user
    // req.user should be of the form {userID : ActualID}
    const boards = await BoardModel.findByUserId(req.user.userID);
    
    res.json(boards);
    
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving discussion boards.' });
  }
}
export const getBoardNameById = async (req, res) => {
  try {

    const boardId = req.params.boardID;
    const result = await BoardModel.findBoardNameById(boardId);

    if (result) {
      res.json(result);
    } else {
      res.status(404).send('Board not found in the database.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving the board.');
  }
};


export const getBoardMembers = async (req, res) => {
  
  try {

      const boardID = req.params.boardID;
      const members = await BoardModel.getBoardMembersModel(boardID);
      res.json(members);

  } catch (error) {
      res.status(500).json({message:'Error getting board members on the database.'});
  }
};

// create a board for the user
// Additionally, create a default channel (called general) for the board
export async function createBoard(req, res) {
  
  const{ boardName } = req.body;

  try{
    
    // still, we suppose the req.user is of the form {userID: ActualID}
    const userID = req.user.userID;
    const newBoard = await BoardModel.createBoardModel(userID, boardName);

    // Create Default Channel
    const defaultChannelName = "general";
    const defaultChannel = await ChannelModel.createChannel(newBoard.board_id, defaultChannelName);

    // add owner to default channel
    await ChannelModel.addChannelMember(defaultChannel.channel_id, userID, true); // true => is the owner

    res.json(newBoard);

  }catch(error){

    res.status(500).json({message: "Error when creating a new board -- discussionControllers"});
  }

}

export async function deleteBoard(req, res) {

  const {boardID} = req.params;

  try{

    const board = await BoardModel.findByBoardId(boardID);

    // 1. check if board exists
    if(!board){
      return res.status(404).json({message: "Board not found. Check your inputs."});
    }

    // 2. check if board owner is the user who requests for deletion

    if(board.user_id !== req.user.userID){
      return res.status(403).json({message:"Not authorized to delete this board."});
    }

    // 3. if passing the check, delete all messages in the baord
    const defaultChannel = await ChannelModel.findDefaultChannel(boardID);
    await MessageModel.deleteMessagesByChannelID(defaultChannel.channel_id);

    // 4. then delete all channels of the board
    await ChannelModel.removeAllChannelsBoard(boardID);

    // 5. then, delete the board
    await BoardModel.deleteBoardModel(boardID);
    
    res.json({message: "Board deleted successfullly. You can continue now."});
        
  }catch (error){
    res.status(500).json({message: "Error deleting the board."});
  }
}


// add an member to the board ( and to the default channel)
export async function addBoardMember(req, res){

  const {boardID, userEmail} = req.body;

  try{
    const board = await BoardModel.findByBoardId(boardID);
    
    // userToAdd: {id: xx, fullname:xx, username:xx, password: xx, email:xx }
    const userToAdd = await UserModel.findByEmail(userEmail);

    // 1. check if the board is found in the database
    if(!board){
      return res.status(404).json({message:"Board not found. Tyry again!"});
    }

    // 2. check if the user has the right to delete the board.
    // suppose the middleware function verifyToken assisn req.user the decoded token of the form {userID: actualID}
    if(board.user_id !== req.user.userID){
      return res.status(403).json({message:"Not authorized to add members to this board."});
    }

    // 3. check if we can find the user in our database
    if(!userToAdd){
      return res.status(404).json({message: "User not found. Check your inputs."});
    }

    // 4. check if it's already a member        
    const isMember = await BoardModel.isUserAlreadyMember(boardID, userToAdd.id);
    if (isMember) {
      return res.status(400).json({ message: "User is already a member." });
    }

    // 5. if passing all the checks, we can add the user!
    await BoardModel.addMember(boardID, userToAdd.id);
    
    // 6. add the user to the default channel
    const defaultChannel = await ChannelModel.findDefaultChannel(boardID);
    await ChannelModel.addChannelMember(defaultChannel.channel_id, userToAdd.id, false); // "false" means isOwner = false


    res.json({message: "Member added to board successfully"});

  }catch(error){

    res.status(500).json({message:"Error adding members to board."});

  }

}

export async function removeBoardMember(req, res) {

  const {boardID, userEmail} = req.body;
  
  try{
    
    const board = await BoardModel.findByBoardId(boardID);
    // userToRemove: {id: xx, fullname:xx, username:xx, password: xx, email:xx }
    const userToRemove = await UserModel.findByEmail(userEmail);

    // 1. if no board, returns an error msg
    if(!board){
      return res.status(404).json({message: "Board not found. Try again."});
    }

    // 2. if not authorized, returns an error msg
    if(board.user_id !== req.user.userID){
      return res.status(403).json({message: "Not authorized to remove members from this board."});
    }

    // 3. check if the user is not found. If so, returns an error msg.
    if(!userToRemove){
      return res.status(404).json({message: "User not found. Check your inputs."});
    }

    // 4. does not allow anyone to remove the owner
    if(board.user_id === userToRemove.id){
      return res.status(403).json({message:"Cannot remove the owner!"});
    }

    // 5. remove the member
    await BoardModel.removeMember(boardID, userToRemove.id);

    // 6. also remove the member from all the channels of the board
    await ChannelModel.removeAllChannelsMember(boardID, userToRemove.id);


    res.json({message:"Member removed from board successfully."});


  }catch(error){

    res.status(500).json({message: "Error happens in controller when removing members from the board."});

  }

}




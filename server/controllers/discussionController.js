// Inside: /server/controllers/discussionController.js
import { findByUserId, findByBoardId, createBoard, deleteBoard, addMember, removeMember } from "../models/Board";
//import { findByEmail } from "../models/User";


export async function getBoards(req, res) {

    try {

      // the authMiddleware will decode the token and assign the decoded to req.user
      // req.user is of the form {userID : ActualID}
      const boards = await findByUserId(req.user.userID);

      res.json(boards);

    } catch (error) {

      res.status(500).json({ message: 'Error retrieving discussion boards.' });
    }
}

export async function createBoard(req, res) {

  // suppose boardName is stored in the request body
  const{ boardName } = req.body;
  try{

    // still, we suppose the req.user is of the form {userID: ActualID}
    // the verifyToken function in authMiddleware.js assign this decoded token to req.user
    // the newly created board data returned by the function.
    const newBoard = await createBoard(req.user.userID, boardName);

    res.json(newBoard);

  }catch(error){

    res.status(500).json({message: "Error when creating a new board -- discussionControllers"});
  }

}

export async function deleteBoard(req, res) {

  // assume the deleted board ID is known in the request URL path's parameters
  const {boardID} = req.params;

  try{

    const board = await findByBoardId(boardID);

    if(!board){
      return res.status(404).json({message: "Board not found."});
    }

    // assume req.user is the decoded token, which is of the form {userID: ActualID}
    if(board.user_id !== req.user.userID){
      return res.status(403).json({message:"Not authorized to delete this board."});
    }

    await deleteBoard(boardID);

    res.json({message: "Board deleted successfullly."});

  }catch (error){
    res.status(500).json({message: "Error deleting the board."});
  }
}

export async function addBoardMember(req, res){
  const {boardID, userEmail} = req.body;
  try{

    const board = await findByBoardId(boardID);

    // firstly, check if the board is found in the database
    if(!board){
      return res.status(404).json({message:"Board not found."});
    }

    // secondly, check if the user has the right to delete the board.
    // suppose the middleware function verifyToken assisn req.user the decoded token of the form {userID: actualID}
    if(board.user_id !== req.user.userID){
      return res.status(403).json({message:"Not authorized to add members to this board."});
    }

    // thirdly, check if we can find the user in our database
    const userToAdd = await User.findByEmail(userEmail);

    // userToAdd: {id: xx, fullname:xx, username:xx, password: xx, email:xx }
    if(!userToAdd){
      return res.status(404).json({message: "User not found."});
    }

    // if passing all the checks, we can add the user!
    await addMember(boardID, userToAdd.id);
    
    res.json({message: "Member added to board successfully"});

  }catch(error){

    res.status(500).json({message:"Error adding members to board."});

  }

}

export async function removeBoardMember(req, res) {

  const {boardID, userEmail} = req.body;

  try{

    // 1. try to find the board
    const board = await findByBoardId(boardID);

    // if no board, returns an error msg
    if(!board){
      return res.status(404).json({message: "Board not found."});
    }

    // if not authorized, returns an error msg
    if(board.user_id !== req.user.userID){
      return res.status(403).json({message: "Not authorized to remove members from this board"});
    }

    // 2. try to find the user
    // userToRemove: {id: xx, fullname:xx, username:xx, password: xx, email:xx }
    const userToRemove = await User.findByEmail(userEmail);
    
    // if the user is not found, returns an error msg.
    if(!userToRemove){
      return res.status(404).json({message: "User not found."});
    }

    // 3. remove the member
    await removeMember(boardID, userToRemove.id);

    // also remove from channels, channel_members??
    res.json({message:"Member removed from board successfully"});


  }catch(error){

    res.status(500).json({message: "Error happens in controller when removing members from the board."});

  }
}




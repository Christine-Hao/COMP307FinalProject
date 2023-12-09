import MessageModel from "../models/Message.js";
import ChannelModel from "../models/Channel.js";

// save a message and return the message
export async function handleSaveMessage(content, boardID, userID){
    try{
        const defaultChannel = await ChannelModel.findDefaultChannel(boardID);

        const message = await MessageModel.saveMessage(content, defaultChannel.channel_id, userID);
        
        return message;

    } catch(error){
        console.error("Error in handleSaveMessage:", error);
    }
}
// get messsages of a board
export async function handleGetMessages(req, res){
    try {

        const boardID = req.params.boardID;
        const defaultChannel = await ChannelModel.findDefaultChannel(boardID);
        const messages = await MessageModel.getMessagesByChannel(defaultChannel.channel_id);

        res.json(messages);

    } catch (error) {
        res.status(500).send("message controller error when fetching messages");
    }
}

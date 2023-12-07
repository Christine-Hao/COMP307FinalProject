import { saveMessage, getMessagesByChannel } from "../models/Message.js";
import { findDefaultChannel } from "../models/Channel.js";


export async function handleSaveMessage(content, boardID, userID){
    try{
        const defaultChannel = await findDefaultChannel(boardID);

        const message = await saveMessage(content, defaultChannel.channel_id, userID);
        
        return message;

    } catch(error){
        console.error("Error in handleSaveMessage:", error);
    }
}

export async function handleGetMessages(req, res){
    try {

        const boardID = req.params.boardID;
        const defaultChannel = await findDefaultChannel(boardID);
        const messages = await getMessagesByChannel(defaultChannel.channel_id);

        res.json(messages);

    } catch (error) {
        res.status(500).send("message controller error when fetching messages");
    }
}

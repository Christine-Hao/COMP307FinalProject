import { saveMessage, getMessagesByChannel } from "../models/Message";

export async function handleSaveMessage(content, channelID, userID){
    try{
        const message = await saveMessage(content, channelID, userID);
        return message;
    } catch(error){
        console.error("Error in handleSaveMessage:", error);
    }
}

export async function handleGetMessages(channelID){
    try{
        const messages = await getMessagesByChannel(channelID);
        return messages;
    }catch(error){
        console.error("Error in handleGetMessages:", error);
    }
}

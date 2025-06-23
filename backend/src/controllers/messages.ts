import { NextFunction, Request, Response } from "express";
import Message from "../db/models/messageModel";

export const getMessages = async ( req: Request, res: Response, next: NextFunction) => {
    try{

        const {id: userToId} = req.params;
        const myId = req.body.userId;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToId},
                {senderId: userToId, receiverId: myId}
            ]
        })

        res.status(200).json(messages);

    } catch(error) {
        console.log("Error in getMessgaes function: ", error);
        res.status(500).json({ "message": "Internal Server Error"});
    }
}

export const sendMessage = async ( req: Request, res: Response, next: NextFunction ) => {

    try {
        const { text, image } = req.body;

    } catch (error) {
        
    }
}
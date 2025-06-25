import { NextFunction, Request, Response } from "express";
import Message from "../db/models/messageModel";
import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId, io } from "../lib/socket";

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
        const { id: userToId } = req.params;
        const senderId = req.body.userId;

        let imageUrl = "";

        if (image) {
            // upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.url; 
        }

        const newMessage = new Message({
            senderId,
            receiverId: userToId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // realtime functionality 
        const receiverSocketId = getReceiverSocketId(userToId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("new-message", newMessage);
        }

        res.status(201).json(newMessage);

    }  catch(error) {
        console.log("Error in sendMessgaes function: ", error);
        res.status(500).json({ "message": "Internal Server Error"});
    }
}
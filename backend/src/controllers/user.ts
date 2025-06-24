import { NextFunction, Request, Response } from "express"
import Users from "../db/models/userModel"

export const getUserFriends = async(req: Request, res: Response, next: NextFunction) => {
    
    try {
        //from Middleware
        const userId = req.body.userId;

        const user = await Users.findById(userId).populate("friends");

        if (!user) {
            res.status(200).json({
                message: "User Not Found",
                success: false,
            });
            return; 
        }

        user.password = "";

        res.status(200).json({
            success: true,
            data: user.friends,
            user: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "auth error",
            success: false,
            error: error
        })
    }
}
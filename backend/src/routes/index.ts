import { Router } from "express";
import { login } from "../controllers/login";
import { authMiddleware } from "../middleware/authMiddleware";
import { getUserFriends } from "../controllers/user";
import messageRouter from "../routes/message.route";


export const router = Router();

router.post(`/auth/login`, login)

router.get('/user/get-friends', authMiddleware, getUserFriends);

router.use(`/message`, authMiddleware, messageRouter)

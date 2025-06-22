import { Router } from "express";
import { login } from "../controllers/login";
import { authMiddleware } from "../middleware/authMiddleware";
import { getUserFriends } from "../controllers/user";


export const router = Router();

router.post(`/auth/login`, login)
router.get('/user/get-friends', authMiddleware, getUserFriends)
import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messages";

const router = Router();

// To get all messages
router.get('/:id', getMessages)

// To store the Sent messages 
router.post('/send/:id', sendMessage)

export default router;

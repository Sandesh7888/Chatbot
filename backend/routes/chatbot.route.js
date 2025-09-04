import express from 'express';
import { Message } from '../controllers/chatbotMessage.js';  // ✅ match filename


const router = express.Router();

router.post("/message", Message);


export default router;

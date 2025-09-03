import express from 'express';
import { Message } from '../controllers/chatbotMessage.js';

const router = express.Router();

// POST /api/chatbot/message
router.post("/message", Message);

export default router;

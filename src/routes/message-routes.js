import express from 'express';
import MessageController from '../controller/message-controller.js';

const router = express.Router();

// Get message history for a conversation
router.get('/:conversationId', MessageController.getMessages);

export default router;

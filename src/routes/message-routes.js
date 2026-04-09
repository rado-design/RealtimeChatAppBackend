import express from 'express';
import MessageController from '../controller/message-controller.js';

const router = express.Router();

router.get('/:conversationId', MessageController.getMessages);

export default router;

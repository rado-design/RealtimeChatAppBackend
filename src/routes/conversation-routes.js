import express from 'express';
import MessageController from '../controller/message-controller.js';

const router = express.Router();

router.get('/', MessageController.getConversations);
router.post('/private', MessageController.startPrivateConversation);

export default router;

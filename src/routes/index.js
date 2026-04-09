import express from 'express';
const router = express.Router();

// Import de tous les modules de routes
import userRoutes from './user-routes.js';
import authRoutes from './auth-routes.js';
import messageRoutes from './message-routes.js';
import conversationRoutes from './conversation-routes.js';
import groupRoutes from './group-routes.js';

// Montage
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/messages', messageRoutes);
router.use('/conversations', conversationRoutes);
router.use('/groups', groupRoutes);

export default router;
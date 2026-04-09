import express from 'express';
const router = express.Router();

// Import de tous les modules de routes
import userRoutes from './user-routes.js';
import authRoutes from './auth-routes.js';

// Montage
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
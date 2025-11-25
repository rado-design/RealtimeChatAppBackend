const express = require('express');
const router = express.Router();

// Import de tous les modules de routes
const userRoutes = require('./user-routes');
const authRoutes = require('./auth-routes');


// Montage
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
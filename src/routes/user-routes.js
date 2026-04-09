import express from 'express';
const router = express.Router();
import UserController from '../controller/user-controller.js';

router.post('/users', UserController.createUser);

export default router;
import express from 'express';
const router = express.Router();
import AuthentificationController from '../controller/authentificatino-controller.js';

router.post('/register', AuthentificationController.register);
router.post('/login', AuthentificationController.login);
router.get('/refresh-token', AuthentificationController.generateNewPairToken);

export default router;

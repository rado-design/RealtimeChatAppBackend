import express from 'express';
import GroupController from '../controller/group-controller.js';

const router = express.Router();

router.post('/', GroupController.createGroup);
router.post('/:groupId/participants', GroupController.addParticipants);
router.delete('/:groupId/participants', GroupController.removeMember);
router.post('/:groupId/leave', GroupController.leaveGroup);
router.patch('/:groupId/participants/role', GroupController.updateRole);

export default router;

import GroupService from '../services/group-service.js';

class GroupController {
    /**
     * Creates a new group.
     */
    static async createGroup(req, res) {
        try {
            const { participants, title } = req.body;
            const creatorId = req.user?._id || req.body.creatorId; // Use req.user in production

            const group = await GroupService.createGroup(participants, title, creatorId);
            res.status(201).json({ success: true, group });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    }

    /**
     * Adds participants to a group.
     */
    static async addParticipants(req, res) {
        try {
            const { groupId } = req.params;
            const { participantIds } = req.body;
            const group = await GroupService.addParticipants(groupId, participantIds);
            res.status(200).json({ success: true, group });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    }

    /**
     * Removes a participant from a group.
     */
    static async removeMember(req, res) {
        try {
            const { groupId } = req.params;
            const { userId } = req.body;
            const requesterId = req.user?._id || req.body.adminId;

            const group = await GroupService.removeParticipant(groupId, requesterId, userId);
            res.status(200).json({ success: true, group });
        } catch (error) {
            res.status(403).json({ success: false, msg: error.message });
        }
    }

    /**
     * Leaves a group.
     */
    static async leaveGroup(req, res) {
        try {
            const { groupId } = req.params;
            const userId = req.user?._id || req.body.userId;

            const group = await GroupService.leaveGroup(groupId, userId);
            res.status(200).json({ success: true, group });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    }

    /**
     * Updates member role.
     */
    static async updateRole(req, res) {
        try {
            const { groupId } = req.params;
            const { userId, role } = req.body;
            const requesterId = req.user?._id || req.body.adminId;

            const group = await GroupService.updateParticipantRole(groupId, requesterId, userId, role);
            res.status(200).json({ success: true, group });
        } catch (error) {
            res.status(403).json({ success: false, msg: error.message });
        }
    }
}

export default GroupController;

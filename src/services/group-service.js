import Conversation from '../models/conversation-model.js';

class GroupService {
    /**
     * Creates a new group conversation.
     * @param {Array} participantIds - Initial members (excluding creator).
     * @param {String} title - Group title.
     * @param {String} creatorId - Admin ID.
     */
    static async createGroup(participantIds = [], title, creatorId) {
        const uniqueParticipants = [...new Set(participantIds)].filter(id => id !== creatorId);

        const participants = [
            { user: creatorId, role: 'ADMIN' },
            ...uniqueParticipants.map(id => ({ user: id, role: 'MEMBER' }))
        ];

        return await Conversation.create({
            participants,
            title: title || 'Nouveau Groupe',
            isGroup: true,
            creator: creatorId
        });
    }

    /**
     * Adds participants to an existing group.
     */
    static async addParticipants(groupId, participantIds) {
        const formattedParticipants = participantIds.map(id => ({ user: id, role: 'MEMBER' }));
        return await Conversation.findByIdAndUpdate(
            groupId,
            { $addToSet: { participants: { $each: formattedParticipants } } },
            { new: true }
        );
    }

    /**
     * Removes a participant. Only if requester is ADMIN.
     */
    static async removeParticipant(groupId, requesterId, targetUserId) {
        const conversation = await Conversation.findById(groupId);
        if (!conversation) throw new Error('Conversation not found');

        const requester = conversation.participants.find(p => p.user.toString() === requesterId.toString());
        if (!requester || requester.role !== 'ADMIN') {
            throw new Error('Only admins can remove participants');
        }

        return await Conversation.findByIdAndUpdate(
            groupId,
            { $pull: { participants: { user: targetUserId } } },
            { new: true }
        );
    }

    /**
     * Leaves a group.
     */
    static async leaveGroup(groupId, userId) {
        return await Conversation.findByIdAndUpdate(
            groupId,
            { $pull: { participants: { user: userId } } },
            { new: true }
        );
    }

    /**
     * Updates a participant's role. Only if requester is ADMIN.
     */
    static async updateParticipantRole(groupId, requesterId, targetUserId, newRole) {
        const conversation = await Conversation.findById(groupId);
        if (!conversation) throw new Error('Conversation not found');

        const requester = conversation.participants.find(p => p.user.toString() === requesterId.toString());
        if (!requester || requester.role !== 'ADMIN') {
            throw new Error('Only admins can change roles');
        }

        return await Conversation.findOneAndUpdate(
            { _id: groupId, 'participants.user': targetUserId },
            { $set: { 'participants.$.role': newRole } },
            { new: true }
        );
    }
}

export default GroupService;

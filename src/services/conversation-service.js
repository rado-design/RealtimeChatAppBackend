import Conversation from '../models/conversation-model.js';

class ConversationService {
    /**
     * Finds or creates a 1-on-1 private conversation.
     */
    static async getOrCreatePrivateConversation(participantIds) {
        const uniqueParticipants = [...new Set(participantIds)].sort();

        if (uniqueParticipants.length !== 2) {
            throw new Error('A private conversation must have exactly 2 participants.');
        }

        let conversation = await Conversation.findOne({
            isGroup: false,
            'participants.user': { $all: uniqueParticipants },
            participants: { $size: 2 }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: uniqueParticipants.map(id => ({ user: id, role: 'MEMBER' })),
                isGroup: false
            });
        }

        return conversation;
    }

    /**
     * Retrieves all conversations (private & group) for a specific user.
     */
    static async getUserConversations(userId) {
        return await Conversation.find({ 'participants.user': userId })
            .populate('participants.user', 'first_name name email avatar')
            .populate('lastMessage')
            .sort({ updatedAt: -1 });
    }
}

export default ConversationService;

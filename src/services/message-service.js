import Message from '../models/message-model.js';
import Conversation from '../models/conversation-model.js';

class MessageService {
    /**
     * Saves a new message and updates conversation's lastMessage.
     */
    static async sendMessage(conversationId, senderId, content) {
        const message = await Message.create({
            conversationId,
            sender: senderId,
            content
        });

        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: message._id
        });

        return message;
    }

    /**
     * Retrieves messages for a conversation.
     */
    static async getMessageHistory(conversationId) {
        return await Message.find({ conversationId })
            .sort({ createdAt: 1 })
            .populate('sender', 'first_name name email avatar');
    }
}

export default MessageService;

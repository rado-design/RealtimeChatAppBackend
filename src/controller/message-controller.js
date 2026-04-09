import ConversationService from '../services/conversation-service.js';
import MessageService from '../services/message-service.js';

class MessageController {
    /**
     * Retrieves all conversations for the authenticated user.
     */
    static async getConversations(req, res) {
        try {
            const userId = req.user?._id || req.query.userId;
            const conversations = await ConversationService.getUserConversations(userId);
            res.status(200).json({ success: true, conversations });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    }

    /**
     * Retrieves message history for a specific conversation.
     */
    static async getMessages(req, res) {
        try {
            const { conversationId } = req.params;
            const messages = await MessageService.getMessageHistory(conversationId);
            res.status(200).json({ success: true, messages });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    }

    /**
     * Creates or retrieves a 1-on-1 private conversation.
     */
    static async startPrivateConversation(req, res) {
        try {
            const { participants } = req.body;
            const conversation = await ConversationService.getOrCreatePrivateConversation(participants);
            res.status(200).json({ success: true, conversation });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    }
}

export default MessageController;

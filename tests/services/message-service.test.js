import { connectDB, closeDB, clearDB } from '../db-setup.js';
import MessageService from '../../src/services/message-service.js';
import ConversationService from '../../src/services/conversation-service.js';
import User from '../../src/models/user-model.js';
import Conversation from '../../src/models/conversation-model.js';

describe('MessageService', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    let user1, user2;

    beforeEach(async () => {
        user1 = await User.create({ first_name: 'U1', name: 'Test', email: 'u1@test.com', password: 'pw' });
        user2 = await User.create({ first_name: 'U2', name: 'Test', email: 'u2@test.com', password: 'pw' });
    });

    test('should save a message and update lastMessage in conversation', async () => {
        const conversation = await Conversation.create({
            participants: [{ user: user1._id, role: 'MEMBER' }, { user: user2._id, role: 'MEMBER' }]
        });
        const message = await MessageService.sendMessage(conversation._id, user1._id, 'Hello world');

        expect(message.content).toBe('Hello world');

        const updatedConv = await Conversation.findById(conversation._id);
        expect(updatedConv.lastMessage.toString()).toBe(message._id.toString());
    });

    test('should retrieve message history', async () => {
        const conversation = await ConversationService.getOrCreatePrivateConversation([user1._id, user2._id]);
        await MessageService.sendMessage(conversation._id, user1._id, 'Msg 1');
        await MessageService.sendMessage(conversation._id, user2._id, 'Msg 2');

        const history = await MessageService.getMessageHistory(conversation._id);
        expect(history).toHaveLength(2);
        expect(history[0].content).toBe('Msg 1');
        expect(history[1].content).toBe('Msg 2');
    });
});

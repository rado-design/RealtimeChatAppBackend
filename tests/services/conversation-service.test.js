import { connectDB, closeDB, clearDB } from '../db-setup.js';
import ConversationService from '../../src/services/conversation-service.js';
import User from '../../src/models/user-model.js';

describe('ConversationService', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    let user1, user2;

    beforeEach(async () => {
        user1 = await User.create({ first_name: 'U1', name: 'Test', email: 'u1@test.com', password: 'pw' });
        user2 = await User.create({ first_name: 'U2', name: 'Test', email: 'u2@test.com', password: 'pw' });
    });

    test('should create a new private conversation', async () => {
        const conversation = await ConversationService.getOrCreatePrivateConversation([user1._id, user2._id]);
        expect(conversation.isGroup).toBe(false);
        expect(conversation.participants).toHaveLength(2);
        expect(conversation.participants[0].role).toBe('MEMBER');
    });

    test('should throw error if more than 2 participants for private chat', async () => {
        await expect(ConversationService.getOrCreatePrivateConversation([user1._id, user2._id, 'someId']))
            .rejects.toThrow('A private conversation must have exactly 2 participants.');
    });
});

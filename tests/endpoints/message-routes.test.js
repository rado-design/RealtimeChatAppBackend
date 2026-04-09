import request from 'supertest';
import { connectDB, closeDB, clearDB } from '../db-setup.js';
import app from '../../app.js';
import User from '../../src/models/user-model.js';

describe('Message Routes', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    let user1, user2, token;

    beforeEach(async () => {
        user1 = await User.create({ first_name: 'U1', name: 'Test', email: 'u1@test.com', password: 'pw' });
        user2 = await User.create({ first_name: 'U2', name: 'Test', email: 'u2@test.com', password: 'pw' });

        // Mock user session on req (since we haven't implemented full auth middleware integration in this test)
        // In a real scenario, we would login and get a token.
    });

    test('POST /api/conversations/private should create a conversation', async () => {
        const res = await request(app)
            .post('/api/conversations/private')
            .send({ participants: [user1._id, user2._id] });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test('POST /api/groups should create a group with correct roles', async () => {
        const res = await request(app)
            .post('/api/groups')
            .send({
                participants: [user2._id],
                title: 'Test Group',
                creatorId: user1._id
            });

        expect(res.status).toBe(201);
        expect(res.body.group.participants).toHaveLength(2);
        const admin = res.body.group.participants.find(p => p.role === 'ADMIN');
        expect(admin.user.toString()).toBe(user1._id.toString());
    });

    test('DELETE /api/groups/:id/participants should remove member', async () => {
        const groupRes = await request(app)
            .post('/api/groups')
            .send({ participants: [user2._id], creatorId: user1._id });

        const groupId = groupRes.body.group._id;
        const res = await request(app)
            .delete(`/api/groups/${groupId}/participants`)
            .send({ adminId: user1._id, userId: user2._id });

        expect(res.status).toBe(200);
        expect(res.body.group.participants).toHaveLength(1);
    });

    test('POST /api/groups/:id/leave should allow leaving', async () => {
        const groupRes = await request(app)
            .post('/api/groups')
            .send({ participants: [user2._id], creatorId: user1._id });

        const groupId = groupRes.body.group._id;
        const res = await request(app)
            .post(`/api/groups/${groupId}/leave`)
            .send({ userId: user2._id });

        expect(res.status).toBe(200);
        expect(res.body.group.participants).toHaveLength(1);
    });

    test('GET /api/messages/:conversationId should return messages', async () => {
        const startRes = await request(app)
            .post('/api/conversations/private')
            .send({ participants: [user1._id, user2._id] });

        const conversationId = startRes.body.conversation._id;

        const res = await request(app).get(`/api/messages/${conversationId}`);
        expect(res.status).toBe(200);
        expect(res.body.messages).toBeInstanceOf(Array);
    });
});

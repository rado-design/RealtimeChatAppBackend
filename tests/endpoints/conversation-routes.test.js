import request from 'supertest';
import { connectDB, closeDB, clearDB } from '../db-setup.js';
import app from '../../app.js';
import User from '../../src/models/user-model.js';

describe('Conversation Routes', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    let user1, user2;

    beforeEach(async () => {
        user1 = await User.create({ first_name: 'U1', name: 'Test', email: 'u1@test.com', password: 'pw' });
        user2 = await User.create({ first_name: 'U2', name: 'Test', email: 'u2@test.com', password: 'pw' });
    });

    test('POST /api/conversations/private should create a conversation', async () => {
        const res = await request(app)
            .post('/api/conversations/private')
            .send({ participants: [user1._id, user2._id] });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test('GET /api/conversations should list conversations', async () => {
        await request(app)
            .post('/api/conversations/private')
            .send({ participants: [user1._id, user2._id] });

        const res = await request(app).get('/api/conversations');
        expect(res.status).toBe(200);
        expect(res.body.conversations).toBeInstanceOf(Array);
    });
});

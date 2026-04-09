import request from 'supertest';
import { connectDB, closeDB, clearDB } from '../db-setup.js';
import app from '../../app.js';
import UserServices from '../../src/services/user-services.js';

describe('User Routes', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    const userData = {
        first_name: 'Alice',
        name: 'Wonderland',
        email: 'alice@example.com',
        password: 'password123'
    };

    test('POST /api/users/users should exist', async () => {
        const res = await request(app)
            .post('/api/users/users')
            .send(userData);

        expect(res.status).not.toBe(404);
    });
});

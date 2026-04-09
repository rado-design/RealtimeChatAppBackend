import request from 'supertest';
import { connectDB, closeDB, clearDB } from '../db-setup.js';
import app from '../../app.js';
import User from '../../src/models/user-model.js';

describe('Auth Routes', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    const userData = {
        first_name: 'Jane',
        name: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123'
    };

    test('POST /api/auth/register should create a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(userData);

        expect(res.status).toBe(201);
        expect(res.body.user_info).toBeDefined();
        expect(res.body.user_info.email).toBe(userData.email);
        expect(res.header['set-cookie']).toBeDefined(); // refreshToken cookie
    });

    test('POST /api/auth/login should authenticate user', async () => {
        // Register first
        await request(app).post('/api/auth/register').send(userData);

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: userData.email,
                password: userData.password
            });

        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeDefined();
    });

    test('GET /api/auth/refresh-token should refresh access token', async () => {
        const registerRes = await request(app).post('/api/auth/register').send(userData);
        const refreshTokenCookie = registerRes.header['set-cookie'][0];
        const refreshToken = refreshTokenCookie.split(';')[0].split('=')[1];

        const res = await request(app)
            .get('/api/auth/refresh-token')
            .set('Cookie', [`refreshToken=${refreshToken}`]);

        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeDefined();
    });
});

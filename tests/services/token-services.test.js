import { connectDB, closeDB, clearDB } from '../db-setup.js';
import TokenServices from '../../src/services/token-services.js';
import User from '../../src/models/user-model.js';
import RefreshToken from '../../src/models/refreshtoken-model.js';
import jwt from 'jsonwebtoken';

describe('TokenServices', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    const userMock = {
        _id: '60d0fe4f5311236168a109ca',
        email: 'test@example.com'
    };

    test('should generate a JWT token', async () => {
        const token = await TokenServices.generateJwtToken(userMock);
        expect(token).toBeDefined();
        const decoded = jwt.decode(token);
        expect(decoded._id).toBe(userMock._id);
    });

    test('should generate a random refresh token', async () => {
        const refreshToken = await TokenServices.generateToken();
        expect(refreshToken.token).toHaveLength(128); // 64 bytes in hex
        expect(refreshToken.expiresAt).toBeInstanceOf(Date);
    });

    test('should register a refresh token in DB', async () => {
        const payload = {
            userId: userMock._id,
            token: 'random_token_123',
            expiresAt: new Date(Date.now() + 10000)
        };
        await TokenServices.registerRefreshToken(payload);
        const storedToken = await RefreshToken.findOne({ token: payload.token });
        expect(storedToken).toBeDefined();
        expect(storedToken.userId.toString()).toBe(payload.userId);
    });

    test('should generate a new access token from valid refresh token', async () => {
        // First create a real user to satisfy the findUserById call in generateNewAccessToken
        const user = new User({
            first_name: 'Test',
            name: 'User',
            email: 'test@example.com',
            password: 'hashedpassword'
        });
        await user.save();

        const refreshToken = await TokenServices.generateToken();
        await TokenServices.registerRefreshToken({
            userId: user._id,
            token: refreshToken.token,
            expiresAt: refreshToken.expiresAt
        });

        const result = await TokenServices.generateNewAccessToken(refreshToken.token);
        expect(result.newAccessToken).toBeDefined();
        expect(result.newRefreshToken).toBeDefined();
        expect(result.newRefreshToken.token).not.toBe(refreshToken.token); // Rotation
    });
});

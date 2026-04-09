import { connectDB, closeDB, clearDB } from '../db-setup.js';
import UserServices from '../../src/services/user-services.js';
import User from '../../src/models/user-model.js';

describe('UserServices', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    const userData = {
        first_name: 'John',
        name: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
    };

    test('should create a new user', async () => {
        const { user, authToken } = await UserServices.createUser(userData);
        expect(user).toBeDefined();
        expect(user.email).toBe(userData.email);
        expect(user.password).not.toBe(userData.password); // Should be hashed
        expect(authToken).toBeDefined();
        expect(authToken.accessToken).toBeDefined();
        expect(authToken.refreshToken).toBeDefined();
    });

    test('should throw error if email is already used', async () => {
        await UserServices.createUser(userData);
        await expect(UserServices.createUser(userData)).rejects.toThrow("L'adresse email est déjà utilisé");
    });

    test('should find user by email', async () => {
        await UserServices.createUser(userData);
        const user = await UserServices.findUserByEmail(userData.email);
        expect(user).toBeDefined();
        expect(user.email).toBe(userData.email);
    });

    test('should throw error if user not found by email', async () => {
        await expect(UserServices.findUserByEmail('nonexistent@example.com')).rejects.toThrow("Aucun utilisateur trouvé pour ce compte, veuiller créer un compte");
    });

    test('should compare passwords correctly', async () => {
        const hash = await UserServices.hashPassword(userData.password);
        const isMatch = await UserServices.comparePassword(userData.password, hash);
        expect(isMatch).toBe(true);
        const isNotMatch = await UserServices.comparePassword('wrongpassword', hash);
        expect(isNotMatch).toBe(false);
    });
});

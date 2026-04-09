import { connectDB, closeDB, clearDB } from '../db-setup.js';
import GroupService from '../../src/services/group-service.js';
import User from '../../src/models/user-model.js';

describe('GroupService', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await closeDB());
    afterEach(async () => await clearDB());

    let user1, user2;

    beforeEach(async () => {
        user1 = await User.create({ first_name: 'U1', name: 'Test', email: 'u1@test.com', password: 'pw' });
        user2 = await User.create({ first_name: 'U2', name: 'Test', email: 'u2@test.com', password: 'pw' });
    });

    test('should create a group with only the creator as ADMIN', async () => {
        const group = await GroupService.createGroup([], 'Solo Group', user1._id);
        expect(group.isGroup).toBe(true);
        expect(group.participants[0].user.toString()).toBe(user1._id.toString());
        expect(group.participants[0].role).toBe('ADMIN');
    });

    test('should allow ADMIN to remove a MEMBER', async () => {
        const group = await GroupService.createGroup([user2._id], 'Team', user1._id);
        const updated = await GroupService.removeParticipant(group._id, user1._id, user2._id);
        expect(updated.participants).toHaveLength(1);
    });

    test('should not allow MEMBER to remove anyone', async () => {
        const group = await GroupService.createGroup([user2._id], 'Team', user1._id);
        await expect(GroupService.removeParticipant(group._id, user2._id, user1._id))
            .rejects.toThrow('Only admins can remove participants');
    });

    test('should allow a user to leave', async () => {
        const group = await GroupService.createGroup([user2._id], 'Team', user1._id);
        const updated = await GroupService.leaveGroup(group._id, user2._id);
        expect(updated.participants).toHaveLength(1);
    });

    test('should update a role', async () => {
        const group = await GroupService.createGroup([user2._id], 'Team', user1._id);
        const updated = await GroupService.updateParticipantRole(group._id, user1._id, user2._id, 'ADMIN');
        const p2 = updated.participants.find(p => p.user.toString() === user2._id.toString());
        expect(p2.role).toBe('ADMIN');
    });
});

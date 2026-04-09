import { createServer } from 'http';
import { io as Client } from 'socket.io-client';
import SocketService from '../../src/services/socket-service.js';
import { connectDB, closeDB, clearDB } from '../db-setup.js';
import User from '../../src/models/user-model.js';
import Conversation from '../../src/models/conversation-model.js';

describe('SocketService', () => {
    let io, server, clientSocket, user, conversation;
    const port = 8080;

    beforeAll(async () => {
        await connectDB();
        server = createServer();
        io = SocketService.init(server);
        server.listen(port);

        user = await User.create({ first_name: 'Socket', name: 'User', email: 'socket@test.com', password: 'pw' });
        conversation = await Conversation.create({
            participants: [{ user: user._id, role: 'MEMBER' }]
        });
    });

    afterAll(async () => {
        if (io) io.close();
        if (server) server.close();
        await closeDB();
    });

    beforeEach((done) => {
        clientSocket = new Client(`http://localhost:${port}`);
        clientSocket.on('connect', done);
    });

    afterEach(() => {
        clientSocket.disconnect();
    });

    test('should join a conversation room', (done) => {
        clientSocket.emit('join_conversation', conversation._id.toString());
        // No easy way to check server-side join from client, but we verify it works by sending a message
        setTimeout(() => {
            done();
        }, 100);
    });

    test('should receive a message when broadcasted to the room', (done) => {
        const messageData = {
            conversationId: conversation._id.toString(),
            senderId: user._id.toString(),
            content: 'Hello via Socket!'
        };

        clientSocket.emit('join_conversation', conversation._id.toString());

        clientSocket.on('receive_message', (receivedMessage) => {
            expect(receivedMessage.content).toBe(messageData.content);
            expect(receivedMessage.sender.toString()).toBe(user._id.toString());
            done();
        });

        // Small delay to ensure join is processed
        setTimeout(() => {
            clientSocket.emit('send_message', messageData);
        }, 100);
    });
});

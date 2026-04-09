import { Server } from 'socket.io';
import MessageService from './message-service.js';

class SocketService {
    static init(server) {
        const io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        io.on('connection', (socket) => {
            console.log('New user connected:', socket.id);

            // Join a specific conversation room
            socket.on('join_conversation', (conversationId) => {
                socket.join(conversationId);
                console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
            });

            // Handle sending a message
            socket.on('send_message', async ({ conversationId, senderId, content }) => {
                try {
                    // Save message to DB
                    const message = await MessageService.sendMessage(conversationId, senderId, content);

                    // Broadcast message to everyone in the room (including sender if needed)
                    io.to(conversationId).emit('receive_message', message);
                } catch (error) {
                    socket.emit('error', { msg: 'Failed to send message', error: error.message });
                }
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });

        return io;
    }
}

export default SocketService;

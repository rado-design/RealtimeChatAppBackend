import http from 'http';
import app from './app.js';
import SocketService from './src/services/socket-service.js';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

// Initialize Sockets
SocketService.init(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
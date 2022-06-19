import dotenv from 'dotenv';
import http from 'http';
import router from './router';

dotenv.config();

const PORT = process.env.PORT || 5001;
const server = http.createServer(router);

server.listen(PORT);

export { server };

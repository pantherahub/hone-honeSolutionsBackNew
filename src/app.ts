import Server from './models/server';
import 'newrelic';

const server = new Server();
server.listen();

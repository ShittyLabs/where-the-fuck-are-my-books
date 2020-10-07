import './Factories/MongoDBFactory';
import { WhereTheFuckAreMyBooksServer } from './server';

const server = new WhereTheFuckAreMyBooksServer();

server.start();

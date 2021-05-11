require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';

// Create Server
const server = new ApolloServer({schema});

const PORT = process.env.PORT;

server.listen(PORT).then(() => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
});
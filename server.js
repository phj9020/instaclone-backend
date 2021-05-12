require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import {getUser} from "./users/users.utils";

// Create Server
const server = new ApolloServer({
    schema,
    context: async({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        }
    }
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
});

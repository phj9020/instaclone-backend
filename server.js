require('dotenv').config();
import express from "express";
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import {typeDefs, resolvers} from './schema';
import {getUser} from "./users/users.utils";

const PORT = process.env.PORT;

// Create Server
const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        }
    }
});

// tell apollo server work with express server
const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));


// middleware
apollo.applyMiddleware({ app });

app.listen({ port: PORT }, ()=> {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
});

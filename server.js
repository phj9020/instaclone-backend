require('dotenv').config();
import http from "http";
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
    context: async(context) => {
        //http
        if(context.req) {
            return {
                loggedInUser: await getUser(context.req.headers.token),
            }
        } else {
            // websocket
            return {
                // 3. console.log(context);
                // 4. return loggedInUser inside of context=> connection => context 
                loggedInUser: context.connection.context.loggedInUser
            }
        }
    },
    // 1. connect to websocket , able to see token only if user tries to connect
    subscriptions: {
        onConnect: async({token}) => {
            if(!token) {
                throw new Error("You cannot Listen")
            }
            
            const loggedInUser = await getUser(token);

            return {
                // 2. this return value goes to context
                loggedInUser: loggedInUser
            }
            
        },
    },
});

// tell apollo server work with express server
const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
// middleware
apollo.applyMiddleware({ app });

// subscription, 즉 웹소켓에 대한 정보를 서버에 설차 
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);


httpServer.listen(PORT, ()=> {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
});

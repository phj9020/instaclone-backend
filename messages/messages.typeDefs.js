import {gql} from "apollo-server-express";


export default gql`
    type Message {
        id: Int!
        paylaod: String!
        user: User!
        room: Room!
        createdAt: String!
        updatedAt: String!
    }
    type Room {
        id: Int!
        user: [User]
        messages: [Message]
        createdAt: String!
        updatedAt: String!
    }

` 

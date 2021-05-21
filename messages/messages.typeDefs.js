import {gql} from "apollo-server-express";


export default gql`
    type Message {
        id: Int!
        payload: String!
        user: User!
        room: Room!
        read: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    type Room {
        id: Int!
        users: [User]
        messages(page:Int!): [Message]
        unreadTotal: Int!
        createdAt: String!
        updatedAt: String!
    }

` 

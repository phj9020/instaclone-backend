import {gql} from "apollo-server-express";


export default gql`
    type Notification {
        id:       Int!
        payload:   String!
        user:      User!
        createdAt: String!
    }
`
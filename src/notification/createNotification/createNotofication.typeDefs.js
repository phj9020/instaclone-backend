import {gql} from "apollo-server-express";

export default gql`
    type Mutation {
        createNotification(userId:Int!, payload:String!): MutationResponse!
    }
`
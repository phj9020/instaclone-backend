import {gql} from "apollo-server-express";

export default gql`
    type Query {
        searchPhoto(keyword:String!, page: Int!): [Photo]
    }
`
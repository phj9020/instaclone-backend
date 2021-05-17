import {gql} from "apollo-server-express";

export default gql`
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        createdAt: String!
        updatedAt: String!
        hashtags: [Hashtag]
    }
    type Hashtag {
        id: Int!
        hashtag: String!
        photos: [Photo]
        createdAt: String!
        updatedAt: String!
    }
`
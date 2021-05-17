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
        photos(page:Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }
`
import {gql} from "apollo-server-express";

export default gql`
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        likes: Int!
        isMine: Boolean!
        isLiked: Boolean!
        commentNumber: Int!
        comments: [Comment]
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
    type Like {
        id: Int!
        user: User!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }
`
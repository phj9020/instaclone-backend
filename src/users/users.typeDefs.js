import {gql} from "apollo-server-express";

export default gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String! 
        bio: String
        avatar: String
        photos: [Photo]
        createdAt: String!
        updatedAt: String!
        followers: [User]
        following: [User]
        totalFollowings: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
    }
`
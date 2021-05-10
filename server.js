import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';

// node module에 있는 프리즈마 클라이언트 생성
const client = new PrismaClient()

// Define type definition (Schema)
const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        year: Int!
        genre: String
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        movies: [Movie],
        movie(id: Int!): Movie
    }
    type Mutation {
        createMovie(title: String!, year:Int!, genre:String): Movie
        deleteMovie(id: Int!): Movie
        updateMovie(id:Int!, year:Int!): Movie
    }
`;

// Create resolver
const resolvers = {
    Query: {
        movies: ()=> client.movie.findMany(),
        movie: (_, { id })=> client.movie.findUnique({
            where: { 
                id: id 
            }
        })
    },
    Mutation: {
                      // (root, args, context, info)
        createMovie: (_, { title, year, genre }) =>
        client.movie.create({
            data: {
                title,
                year,
                genre,
            },
        }),
        deleteMovie: (_, {id}) => client.movie.delete({where: {id: id}}),
        updateMovie: (_, {id, year}) => client.movie.update({where: {id: id}, data: {year: year}})
    }
};

// Create Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
import {loadFilesSync, mergeResolvers, makeExecutableSchema, mergeTypeDefs} from 'graphql-tools';

// load Type definition
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
export const typeDefs = mergeTypeDefs(loadedTypes);

// load resolver -> queries and mutations
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
export const resolvers = mergeResolvers(loadedResolvers);

// * dont need to makeExecutableSchema typeDefs and resolvers
// ** I put it in apolloServer seperately

// const schema = makeExecutableSchema({typeDefs, resolvers});
// export default schema;
import {loadFilesSync, mergeResolvers, makeExecutableSchema, mergeTypeDefs} from 'graphql-tools';

// load Type definition
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const typeDefs = mergeTypeDefs(loadedTypes);

// load resolver -> queries and mutations
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
const resolvers = mergeResolvers(loadedResolvers);


const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
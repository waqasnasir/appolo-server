const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');
const { gql } = require('apollo-server')

const fs = require('fs')
const books = [
    {
        name: 'book name',
        author: 'author name'
    },
    {
        name: 'book name',
        author: 'author name'
    },
    {
        name: 'book name',
        author: 'author name'
    }
]


const typeDefs = gql`
    type Book {
        name: String,
        author: String
    },
    type Todo {
        userId: Int,
        id: Int,
        title: String,
        completed: Boolean
    }
    type Channel {
        id: ID!                # "!" denotes a required field
        name: String
     }

    type Query {
        books : [Book],
        readError: String,
        getTodo(id:Int): Todo,
        channels: [Channel] 
    }

    # The mutation root type, used to define all mutations.
    type Mutation { # A mutation to add a new channel to the list of channels
        addChannel(name: String!): Channel
    }
`;
// const schema = makeExecutableSchema({ typeDefs });
// addMockFunctionsToSchema({ schema });
module.exports = typeDefs;

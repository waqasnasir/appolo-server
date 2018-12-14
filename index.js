const { ApolloServer, gql, MockList } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest');
const  schema =require('./schema')
const resolvers = require('./resolvers')
class TodOAPi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://jsonplaceholder.typicode.com/';
    }

    async getTodo(id) {
        return this.get(`todos/${id}`);
    }

    async getlimitedTodo(limit = 10) {
        const data = await this.get('todos', {
            per_page: limit,
        });
        return data.results;
    }
}

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
`;


const server = new ApolloServer({
    typeDefs:schema,
    dataSources: () => {
        return {
            todoApi: new TodOAPi(),
        };
    },
    resolvers, formatError: error => {
        console.log(error);
        //return new Error('Internal server error');
        // Or, you can delete the exception information
        delete error.extensions;
        error.custom = "custom error "
        return error;
    },
})

server.listen().then(({ url }) => {
    console.log('server is listening on', url)
})
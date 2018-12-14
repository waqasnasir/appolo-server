let channels = [
    {
        id: 1,
        name: 'channel 1'
    },
    {
        id: 1,
        name: 'channel 2'
    }
]
let nextId = 3;
const resolvers = {
    Query: {
        books: () => books,
        readError: (parent, argument, context) => {
            fs.readFileSync('/does/not/exist');
        },
        getTodo: (_source, { id }, { dataSources }) => {
            return dataSources.todoApi.getTodo(id)
        },
        channels: () => channels
    },

    Mutation: {
        addChannel: (root, args) => {
            const newChannel = { id: nextId++, name: args.name }
            channels.push(newChannel)
            return newChannel
        }
    }
}
module.exports = resolvers
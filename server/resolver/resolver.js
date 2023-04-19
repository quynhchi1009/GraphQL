const { books, authors } = require('../data/static')

const resolvers = {
    //QUERY
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.id.toString() === args.id),  
        authors: () => authors,
        author: (parent, args) => authors.find(author => author.id == args.id)
    },

    Book: {
        author: (parent, args) => authors.find(author => author.id.toString() === parent.authorId)
    },

    Author: {
        books: (parent, args) => books.filter(book => book.authorId.toString() === parent.id)
    },

    //MUTATION
    Mutation: {
        createAuthor: (parent, args) => args,
        createBook: (parent, args) => args
    }
}

module.exports = resolvers 

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

//Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

//Load db methods
const mongoDataMethods = require('./data/db')

//Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://quynhchilai:********@tutorial01.adjuhty.mongodb.net/?retryWrites=true&w=majority',
        {})
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB()

async function startApolloServer(typeDefs,resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ mongoDataMethods })
    })
    const app = express()
    await server.start()
    server.applyMiddleware({ app })

    app.listen({ port: 4000 }, () => {
        console.log(`Server is listening on port http://localhost:4000${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);

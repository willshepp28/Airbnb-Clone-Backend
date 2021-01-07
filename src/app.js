require("dotenv");

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const PORT = process.env.PORT || "4000";
app = express()


app.use(cors());

let users = [
    { id: 1, firstname: "bob", lastname: "brown"},
    { id: 2, firstname: "sarah", lastname: "springer"},
    { id: 3, firstname: "david", lastname: "googins"},
    { id: 4, firstname: "yu", lastname: "mei"}
];


// Example Schema
let schema = buildSchema(`
    type Query {
        getUsers: [User!]!
        getUser(id: Int!): User
    }

    type User {
        id: ID!
        firstname: String!
        lastname: String!
    }

`);


// 
let root = {
    hello: () => {
        return "Hello world!";
    },
    getUsers: () => {
        return users;
    },
    getUser: (id) => {
        return users.find(user => {
            return user.id === id.id
        })
    }


};



app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`GraphQL server listening on Port: ${PORT}`);
});
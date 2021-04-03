const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
    email:String
    posts: [Post]
}

type Post {
    _id: ID
    title: String
    body: String
    post_img: String
    user: User

}

type Query {
    user(userId: ID!): User
    post(_id: ID!): Post
}

input PostInput {
    title: String
    body: String
    post_img: String
}

type Auth {
    token: ID
    user: User
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password:String): User
    login(email: String!, password: String!): Auth
    addPost(input: PostInput): Post
}
`;

module.exports = typeDefs;
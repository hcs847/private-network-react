const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
    email:String
    posts: [Post]
    groups: [Group]
}

type Post {
    _id: ID
    title: String
    body: String
    post_img: String
    email: String
    commentCount: Int
    comments: [Comment]
}

type Comment {
    _id: ID
    firstName: String
    lastName: String
    createdAt: String
    commentBody: String
}

type Group {
    _id: ID
    groupName: String
    groupAdmin: String
    group_img: String
    users: [User]
}

type Query {
    user(userId: ID!): User
    users: [User]
    post(_id: ID!): Post
    posts: [Post]
    group(_id: ID!): Group
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
    addComment(postId: ID!, commentBody:String!): Post
    addGroup(groupName: String!, groupAdmin: String, grou_img: String) : Group
    deletePost(postId: ID!): Post
}
`;

module.exports = typeDefs;
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
    postGroup: String
    title: String
    body: String
    post_img: String
    createdByName: String
    createdById: String
    commentCount: Int
    comments: [Comment]
}

type Comment {
    _id: ID
    createdByName: String
    createdById: String
    createdAt: String
    commentBody: String
}

type Group {
    _id: ID
    groupName: String
    groupAdmin: String
    group_img: String
    users: [User]
    posts: [Post]
}

type Query {
    me: User
    user(_id: ID!): User
    users: [User]
    post(_id: ID!): Post
    posts: [Post]
    postsByGroup(postGroup: String!): [Post]
    group(_id: ID!): Group
    groups: [Group]
    }

input PostInput {
    postGroup: String
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
    deleteGroup(groupId: ID!): Group
}
`;

module.exports = typeDefs;
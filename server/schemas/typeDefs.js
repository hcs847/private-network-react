const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
    email:String
    posts: [Post]
    groups: [Group]
    likedPosts: [Post]
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
    likeCount: Int
    likes: [Like]
}

type Comment {
    _id: ID
    createdByName: String
    createdById: String
    createdAt: String
    commentBody: String
}

type Like {
    _id: ID
    likedByName: String
    likedById: String
    likedAt: String
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
    group(_id: ID!): Group
    groups: [Group]
    liked(postId: ID): User
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
    likePost(postId: ID!): Post
    unLikePost(postId: ID!): Post
    addGroup(groupName: String!, groupAdmin: String, grou_img: String) : Group
    deletePost(postId: ID!): Post
    deleteGroup(groupId: ID!): Group
}
`;

module.exports = typeDefs;
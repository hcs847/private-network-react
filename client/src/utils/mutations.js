import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        token
        user {
            _id
        }
    }
}
`;

export const ADD_POST = gql`
mutation addPost($input: PostInput) {
    addPost(input:$input) {
      _id,
      postGroup
    	title,
    	body,
    	post_img
    	createdByName
      createdById
      commentCount
      comments {
            _id
            createdAt
            createdByName
            createdById
            commentBody
        }
      likeCount
      likes {
      _id
      likedAt
      likedByName
      likedById
    }
      }
    }
`;

export const ADD_COMMENT = gql`
mutation addComment($postId: ID!, $commentBody: String! ){
      addComment(postId: $postId, commentBody: $commentBody) {
      _id
      postGroup
    	title,
    	body,
    	post_img
    	createdByName
      createdById
        commentCount
        comments {
          _id
          createdAt
          commentBody
          createdByName
          createdById
        }  
      }
    }
`;

export const ADD_GROUP = gql`
  mutation addGroup($groupName: String!){
    addGroup(groupName: $groupName){
      _id
      groupName
      groupAdmin
      users {
        firstName
        lastName
      }
    }
  }
  `;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!){
    likePost(postId: $postId) {
      _id
      likeCount
    likes {
      _id
      likedAt
      likedByName
      likedById
    }
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unlikePost($postId: ID!){
    unlikePost(postId: $postId) {
      _id
      likeCount
      likes{
        _id
        likedAt
        likedByName
        likedById
      }
    }
  }
`;
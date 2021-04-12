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
    	title,
    	body,
    	post_img
    	email
      }
    }
`;

export const ADD_COMMENT = gql`
mutation addComment($postId: ID!, $commentBody: String! ){
      addComment(postId: $postId, commentBody: $commentBody) {
        _id
        comments {
          _id
          commentBody
          email
        }
        
      }
    }
`;
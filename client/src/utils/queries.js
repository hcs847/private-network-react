import gql from 'graphql-tag';

export const QUERY_USER = gql`
query user($userId: ID!) {
    user(userId: $userId){
        _id
        email
        firstName
        lastName
        posts {
            _id
            title
            post_img
            body
                }
  		}
    }
`;

export const QUERY_POST = gql`
query post($_id:ID!) {
  post(_id:$_id){
    _id,
    title,
    post_img
    email
    comments {
      _id
      createdAt
      email
      commentBody
    }
  }  
}
`;

export const QUERY_POSTS = gql`
{
  posts {
    _id
    title
    body
    post_img
    comments {
      _id
      createdAt
      email
      commentBody
    }
  }
}
`;
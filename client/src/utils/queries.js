import gql from 'graphql-tag';

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_ME = gql`
{
  me {
    _id
    firstName
    lastName
    email
    groups {
      groupName
    }
    posts {
      title
    }
  }
}
`;

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
    commentCount
    comments {
      _id
      createdAt
      firstName
      lastName
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
    commentCount
    comments {
      _id
      createdAt
      firstName
      lastName
      commentBody
    }
  }
}
`;

export const QUERY_GROUPS = gql`
{
  groups {
    _id
    groupName
    groupAdmin
    group_img
  }
}
`;
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
      post_img
      body
    }
  }
}
`;

export const QUERY_USER = gql`
query user($_id: ID!) {
    user(_id: $_id){
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
    _id
    postGroup
    title
    post_img
    createdByName
    createdById
    likeCount
    likes {
      _id
      likedByName
      likedAt
    }
    commentCount
    comments {
      _id
      createdAt
      createdByName
      createdById
      commentBody
    }
    likes {
      _id
      likedAt
      likedByName
      likedById
    }
  }  
}
`;

export const QUERY_POSTS = gql`
{
  posts {
    _id
    postGroup
    title
    body
    post_img
    createdByName
    createdById
    likeCount
    likes {
      _id
      likedByName
      likedById
      likedAt
    }
    commentCount
    comments {
      _id
      createdAt
      createdByName
      createdById
      commentBody
    }
    likes {
      _id
      likedAt
      likedByName
      likedById
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
    groupImg
    posts {
      _id
      title
      body
      post_img
    }
  }
}
`;

export const QUERY_GROUP = gql`
query group($_id:ID!) {
  group(_id:$_id) {
    _id
    groupName
    groupAdmin
    groupImg
    posts {
      _id
      title
      body
      post_img
    
    }
  }
}
`;

import React from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GROUP, QUERY_POSTS_BY_GROUP } from '../utils/queries';
import Auth from '../utils/auth';

const Group = () => {
    // assign group id to URL's paramaters per App.js
    const { id: _id } = useParams();

    const { loading, data } = useQuery(QUERY_GROUP, {
        variables: { _id }
    });

    // asigning data another name when multiple queries 
    const { data: postsData } = useQuery(QUERY_POSTS_BY_GROUP, {
        variables: { postGroup: _id }
    });

    const group = data?.group || {};
    const groupPosts = postsData?.postsByGroup || {};

    console.log("groupPosts: ", groupPosts, _id, postsData);

    if (loading) {
        return <div>Loading...</div>;
    }

    // protect routes, if user is not logged in, redirect to landing page
    if (!Auth.loggedIn()) {
        return (<Redirect to='/' />)
    }

    return (
        <div className='home-page flex flex-center'>
            <div className="flex flex-between feed-layout">

                <div className="main-container flex flex-columns">
                    <h2>Group Page</h2>
                    <p>Group's Name: {group.groupName}</p>
                    <p>Group's Admin: {group.groupAdmin}</p>
                    <p>{group.group_img}</p>


                    <div className="post-list flex flex-columns center">
                        {groupPosts &&
                            groupPosts.map(post => (
                                <div key={post._id} className="card">
                                    <p><Link className='link' to={`/profile/${post.createdById}`}>{post.createdByName}</Link></p>
                                    <p>{post.body}</p>
                                    <div className="card-image flex flex-columns">
                                        <img className='post-img' src={post.post_img} alt="" />
                                        <h5>{post.title}</h5>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Group

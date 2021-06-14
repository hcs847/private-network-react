import React from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GROUP } from '../utils/queries';
import Auth from '../utils/auth';

const Group = () => {
    // assign group id to URL's paramaters per App.js
    const { id: _id } = useParams();

    const { loading, data } = useQuery(QUERY_GROUP, {
        variables: { _id }
    });

    const group = data?.group || {};

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

                <div className="main-container flex flex-columns center">
                    <div className="group-page card center">
                        <div className="card-title center">
                            <h2>{group.groupName}'s Page</h2>
                            <p>Group's Admin: {group.groupAdmin}</p>
                            <p>{group.groupImg}</p>
                        </div>
                    </div>

                    <div className="post-list flex flex-columns center">
                        {group.posts &&
                            group.posts.map(post => (
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

import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
    // extract posts data
    const { loading, data } = useQuery(QUERY_POSTS);

    // post list
    const posts = data?.posts || [];

    // toggle Post form display to expand on click and hidden as a default
    const [showPostForm, setShowPostForm] = useState(false);
    const togglePostForm = () => setShowPostForm(!showPostForm);
    return (
        <div className='home-page'>
            <div className="main-container">
                <PostForm showPostForm={showPostForm}
                    onPost={togglePostForm} />
                <PostList posts={posts} />
            </div>
        </div>
    )
}

export default Home

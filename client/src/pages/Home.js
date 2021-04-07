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

    return (
        <div className='home-page'>
            <h2 style={{ color: 'gray' }}>Welcome to the home page</h2>
            <PostForm showPostForm={showPostForm}
                onPost={() => setShowPostForm(!showPostForm)} />
            <PostList posts={posts} />

        </div>
    )
}

export default Home

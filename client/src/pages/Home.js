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
    const togglePostForm = () => {
        // toggle display of modal
        setShowPostForm(!showPostForm);
        // add overflow:hidden to body when modal is open
        // in order to disable background scrolling
        // remove additional class of body when modal is closed
        if (!showPostForm) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    };

    // toggle comments display to be hidden as a default
    const [showComments, setShowComments] = useState(false);
    const toggleComments = () => setShowComments(!showComments);
    return (
        <div className='home-page'>
            <div className="main-container">
                <PostForm showPostForm={showPostForm}
                    onPost={togglePostForm} />
                <PostList posts={posts} showComments={showComments} onComments={toggleComments} />
            </div>
        </div>
    )
}

export default Home

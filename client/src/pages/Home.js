import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import GroupList from '../components/GroupList';
import Search from '../components/Search';
import Profile from '../components/Profile';
import { QUERY_POSTS, QUERY_GROUPS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';


const Home = () => {
    // extract queries
    const { loadingPosts, data } = useQuery(QUERY_POSTS);
    const { data: groupsData } = useQuery(QUERY_GROUPS);
    const { data: meData } = useQuery(QUERY_ME_BASIC);

    // extract data from queries
    const posts = data?.posts || [];
    const groups = groupsData?.groups || [];
    const me = meData?.me || [];


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

    const [showCommentForm, setShowCommentForm] = useState(false);
    const toggleCommentForm = () => {
        setShowCommentForm(!showCommentForm);
    }

    // toggle comments display to be hidden as a default
    const [showComments, setShowComments] = useState(false);
    const toggleComments = () => setShowComments(!showComments);

    // protect routes, if user is not logged in, redirect to landing page
    if (!Auth.loggedIn()) {
        return (<Redirect to='/' />)
    }

    return (
        <div className='home-page flex flex-center'>
            <div className="flex flex-between feed-layout">
                <div className="side-container flex flex-columns">
                    <Profile me={me} />
                    <GroupList groups={groups} />
                </div>
                <div className="main-container">
                    <PostForm showPostForm={showPostForm}
                        onPost={togglePostForm} />
                    <PostList posts={posts} showComments={showComments} onComments={toggleComments} showCommentForm={showCommentForm} toggleCommentForm={toggleCommentForm} />
                </div>
                <div className="side-container">
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Home

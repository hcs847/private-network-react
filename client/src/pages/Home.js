import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import GroupList from '../components/GroupList';
import GroupForm from '../components/GroupForm';
import Search from '../components/Search';
import SearchUser from '../components/SearchUser';
import Profile from '../components/Profile';
import { QUERY_POSTS, QUERY_GROUPS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';


const Home = () => {
    // extract queries
    const { data: postsData } = useQuery(QUERY_POSTS);
    const { data: groupsData } = useQuery(QUERY_GROUPS);
    const { data: meData } = useQuery(QUERY_ME_BASIC);

    // extract data from queries
    const posts = postsData?.posts || [];
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

    // handle comments form 
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentsPost, setCommentsPost] = useState('');
    const toggleCommentForm = (id) => {
        setShowCommentForm(!showCommentForm);
        setCommentsPost(id);
    }

    // toggle comments display to be hidden as a default
    const [showComments, setShowComments] = useState(false);
    // assign post's Id to comment to isolate click event
    const toggleComments = (id) => {
        setShowComments(!showComments);
        setCommentsPost(id);
    };

    //toggle likes display
    const [showLikes, setShowLikes] = useState(false);
    const toggleLikesDisplay = () => setShowLikes(!showLikes);

    // handle group form
    const [showGroupForm, setShowGroupForm] = useState(false);
    const toggleGroupForm = () => setShowGroupForm(!showGroupForm);

    // protect routes, if user is not logged in, redirect to landing page
    if (!Auth.loggedIn()) {
        return (<Redirect to='/' />)
    };

    return (
        <div className='home-page flex flex-center'>
            <div className="flex flex-between feed-layout">
                <div className="side-container flex flex-columns">
                    <Profile me={me} />
                    <GroupList groups={groups} />
                </div>
                <div className="main-container">
                    <PostForm showPostForm={showPostForm}
                        onPost={togglePostForm} groups={groups} />
                    <PostList
                        posts={posts}
                        showComments={showComments}
                        onComments={toggleComments}
                        showCommentForm={showCommentForm}
                        toggleCommentForm={toggleCommentForm}
                        commentsPost={commentsPost}
                        setCommentsPost={setCommentsPost}
                        toggleLikes={toggleLikesDisplay}
                        showLikes={showLikes}
                        usersId={me._id} />
                </div>
                <div className="side-container flex flex-columns">
                    <Search />
                    <SearchUser />
                    <GroupForm
                        toggleGroupForm={toggleGroupForm}
                        showGroupForm={showGroupForm} />
                </div>
            </div>
        </div>
    )
}

export default Home;
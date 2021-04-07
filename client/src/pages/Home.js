import React, { useState } from 'react'
import PostForm from '../components/PostForm'

const Home = () => {
    // toggle Post form display to expand on click and hidden as a default
    const [showPostForm, setShowPostForm] = useState(false);

    return (
        <div className='home-page'>
            <h2 style={{ color: 'gray' }}>Welcome to the home page</h2>
            <PostForm showPostForm={showPostForm} onPost={() => setShowPostForm(!showPostForm)} />
        </div>
    )
}

export default Home

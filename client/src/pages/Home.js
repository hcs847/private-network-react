import React from 'react'
import PostForm from '../components/PostForm'

const Home = () => {
    return (
        <div className='home-page'>
            <h2 style={{ color: 'gray' }}>Welcome to the home page</h2>
            <PostForm />
        </div>
    )
}

export default Home

import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Auth from '../utils/auth';

function Landing() {

    // redirect to home page if user is logged in
    if (Auth.loggedIn()) {
        return <Redirect to='/home' />
    }
    return (
        <div className='landing-page flex'>
            <Login />
        </div>
    )
}

export default Landing;

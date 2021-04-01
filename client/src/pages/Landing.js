import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Login from './Login';
import Auth from '../utils/auth';

function Landing() {

    // redirect to home page if user is logged in
    if (Auth.loggedIn()) {
        return <Redirect to='/home' />
    }
    return (
        <div className='landing-page'>
            {/* <h2><Link to='/login'>Login</Link> or <Link to='/signup'>Join</Link></h2> */}
            <Login />
        </div>
    )
}

export default Landing;

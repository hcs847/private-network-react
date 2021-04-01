import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Auth from '../utils/auth';

function Landing() {
    return (
        <div className='landing-page'>
            {/* <h2><Link to='/login'>Login</Link> or <Link to='/signup'>Join</Link></h2> */}
            <Login />
        </div>
    )
}

export default Landing;

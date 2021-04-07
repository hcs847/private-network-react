import React from 'react';
// import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    // logout functionality
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }
    return (
        <div className={`${Auth.loggedIn() ? 'navy' : 'dark'}`}>
            <h1 style={{ color: 'white' }}>The Private Network</h1>
            {Auth.loggedIn() ? (

                <nav className='nav flex flex-between'>
                    <ul className='nav-list flex'>
                        <li className='nav-link'><a href="#">Home</a></li>
                        <li className='nav-link'><a href="#">Me</a></li>
                        <li className='nav-link'><a href="#">My Groups</a></li>
                    </ul>
                    <ul className='nav-list'>
                        <li className='nav-link'><a href="/" onClick={logout}>Logout</a></li>
                    </ul>

                </nav>
            ) : ''}
        </div>
    )
}

export default Header

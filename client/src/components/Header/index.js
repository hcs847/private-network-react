import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    // logout functionality
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }
    return (
        <div className={`header ${Auth.loggedIn() ? 'navy' : 'dark'}`}>
            <h1 className='logo'>The Private Network</h1>
            {Auth.loggedIn() ? (

                <nav className='nav flex flex-between'>
                    <ul className='nav-list flex'>
                        <li className='nav-link'><Link to='/home'>Home</Link></li>
                        <li className='nav-link'><Link to='/profile'>Me</Link></li>
                        {/* <li className='nav-link'><Link to='/group/:id'>My Groups</Link></li> */}
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

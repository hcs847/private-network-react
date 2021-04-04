import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    // useMutation hook fo adding user
    const [addUser] = useMutation(ADD_USER);

    // function to submit signup form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
            Auth.login(data.addUser.token)
        } catch (e) {
            console.error(e);
        }
    }

    // function to capture form inputs
    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className='login-join-background'>
            <h2 className='form-title center'>Signup</h2>
            <form className='form-login-join' onSubmit={handleFormSubmit}>
                <div className='flex flex-between'>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        value={formState.firstName}
                        placeholder='First name'
                        name='firstName'
                        type="text"
                        id='firstName'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-between'>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        value={formState.lastname}
                        placeholder='Last name'
                        name='lastName'
                        type="text"
                        id='lastName'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-between'>
                    <label htmlFor="email">Email:</label>
                    <input
                        value={formState.email}
                        placeholder='youremail@email.com'
                        name='email'
                        type="email"
                        id='email'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-between'>
                    <label htmlFor="pwd">Password:</label>
                    <input
                        value={formState.password}
                        placeholder='******'
                        name='password'
                        type="password"
                        id='pwd'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className='btn' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
            <div className="login-switch">
                <p>Already on The Private Network?  <span className='link'><Link to='/login'>Sign in</Link></span></p>
            </div>

        </div >
    );
}

export default Signup

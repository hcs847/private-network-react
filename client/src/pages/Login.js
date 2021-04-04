import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(event) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <div className='login-join-background'>
            <h2 className='form-title center'>Log in to your account</h2>
            <form className='login-join-form' onSubmit={handleFormSubmit}>
                <div className='flex flex-between'>
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder='youremail@email.com'
                        name='email'
                        id='email'
                        type="email"
                        onChange={handleChange} />
                </div>
                <div className='flex flex-between'>
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder='******'
                        name='password'
                        id='password'
                        type="password"
                        onChange={handleChange}
                    />
                </div>
                {
                    error ? <div>
                        <p>The Provided Credentaials are incorrect!</p>
                    </div> : null
                }
                <div>
                    <button className='btn center' type='submit'>Submit</button>
                </div>
            </form>
            <div className='login-switch'>
                New to the Private Network?
                <span className='link'><Link to='/signup'>Join now</Link></span>
            </div>

        </div>
    )
}

export default Login

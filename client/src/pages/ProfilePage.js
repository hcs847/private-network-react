import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { CgProfile } from "react-icons/cg";
import Auth from '../utils/auth';

const ProfilePage = () => {
    // check 
    const { _id: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME,
        { variables: { _id: userParam } });
    const user = data?.me || data?.user || {};

    console.log(user);

    if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user?._id) {
        return (
            <h4>
                You need to be logged in to this page.
            </h4>
        );
    }
    return (
        <div className='home-page flex flex-center'>
            <div className="flex flex-between feed-layout">

                <div className="main-container">

                    <div className="profile card">
                        <div className="card-title flex flex-left">
                            <CgProfile className='icons title' />
                            <h3 className='title'>
                                {userParam ? `${user.firstName} ${user.lastName}'s` : 'My'} Profile
                                </h3>
                        </div>

                        <ul className='my-profile'>
                            <li>{user.firstName} {user.lastName}</li>
                            <li>{user.email}</li>
                        </ul>

                    </div>


                </div>
            </div>
        </div>


    )
}

export default ProfilePage;

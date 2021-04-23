import React from 'react';
import { CgProfile } from "react-icons/cg";



const Profile = ({ me }) => {
    return (
        <>
            <div className="profile card">
                <div className="card-title flex flex-left">
                    <CgProfile className='icons title' />
                    <h3 className='title'>
                        My Profile
                </h3>
                </div>
                {me && (
                    <ul className='my-profile'>
                        <li>{me.firstName} {me.lastName}</li>
                        <li>{me.email}</li>
                    </ul>
                )
                }
            </div>
        </>

    )
}

export default Profile;

import React from 'react';
import { CgProfile } from "react-icons/cg";



const Profile = ({ me }) => {
    return (
        <>
            <div className="flex flex-left profile">
                <CgProfile className='icons title' />
                <h3 className='title'>
                    My Profile
                </h3>
            </div>
            {me && (
                <ul className='my-profile card'>
                    <li>{me.firstName} {me.lastName}</li>
                    <li>{me.email}</li>
                </ul>
            )
            }
        </>

    )
}

export default Profile

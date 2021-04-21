import React from 'react'

const Profile = ({ me }) => {
    return (
        <>
            <h3>
                My Profile
        </h3>
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

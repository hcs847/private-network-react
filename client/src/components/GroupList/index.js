import React from 'react'

const GroupList = ({ groups }) => {
    return (
        <>
            <h3>
                Groups
        </h3>
            <ul className='group-list card'>
                {groups &&
                    groups.map(group => (
                        <li key={group._id}>{group.groupName}</li>
                    ))
                }

            </ul>
        </>
    )
}

export default GroupList;

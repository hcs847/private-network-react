import React from 'react';
import { RiGroup2Fill } from "react-icons/ri";

const GroupList = ({ groups }) => {
    return (
        <>
            <div className="flex flex-left groups">
                <RiGroup2Fill className='icons title' />
                <h3 className='title'>
                    Groups
                </h3>
            </div>
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

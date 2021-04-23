import React from 'react';
import { RiGroup2Fill } from "react-icons/ri";

const GroupList = ({ groups }) => {
    return (
        <>
            <div className="groups card">
                <div className="card-title flex flex-left">
                    <RiGroup2Fill className='icons title' />
                    <h3 className='title'>
                        Groups
                </h3>
                </div>

                <ul className='group-list'>
                    {groups &&
                        groups.map(group => (
                            <li key={group._id}>{group.groupName}</li>
                        ))
                    }

                </ul>
            </div>
        </>
    )
}

export default GroupList;

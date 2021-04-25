import React from 'react';
import { Link } from 'react-router-dom';
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
                            <li key={group._id}><Link className='link' to={`/group/${group._id}`}>{group.groupName}</Link></li>
                        ))
                    }

                </ul>
            </div>
        </>
    )
}

export default GroupList;

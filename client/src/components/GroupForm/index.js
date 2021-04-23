import React from 'react';
import { MdGroupAdd } from "react-icons/md";



const GroupForm = () => {
    return (
        <div className="group-form card">
            <div className="flex flex-left">
                <MdGroupAdd />
                <h3 className='title'>Create a group</h3>
            </div>
        </div>
    )
}

export default GroupForm

import React, { useState } from 'react'

const GroupDropdown = ({ groups, getGroupId }) => {
    const [dropdownItem, setDropdownItem] = useState('Select a group');

    const handleDropdown = (e) => {
        setDropdownItem(e.target.value);
        getGroupId(e);
    }
    return (
        <label className='flex flex-between' htmlFor="postGroup">
            Group
            <select
                id='postGroup'
                name='postGroup'
                value={dropdownItem}
                onChange={handleDropdown}
                onBlur={handleDropdown}
                disabled={!groups.length}>

                <option>All</option>
                {groups.map(group =>
                    // display group names while storing id's as values for graphql
                    <option key={group._id} value={group._id}>
                        {group.groupName}
                    </option>)}
            </select>

        </label>

    )
}

export default GroupDropdown;

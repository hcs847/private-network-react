import React from 'react'
import { RiUserSearchFill } from "react-icons/ri";


const SearchUser = () => {
    return (
        <div className="search-form flex flex-center card">
            <form className='flex flex-between search-form-input'>
                <RiUserSearchFill className='icons title center m-l-5' />
                <input
                    className='center'
                    type="text"
                    placeholder='Search users'
                />
            </form>

        </div>
    )
}

export default SearchUser

import React from 'react';
import { RiSearchLine } from "react-icons/ri";

const Search = () => {
    return (
        <div className="search-form ">
            <form className='flex flex-between'>
                <RiSearchLine className='icons title center' />
                <input
                    className='center'
                    type="text"
                    placeholder='Search'
                />
            </form>

        </div>
    )
}

export default Search

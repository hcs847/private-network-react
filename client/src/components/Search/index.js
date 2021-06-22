import React from 'react';
import { RiSearchLine } from "react-icons/ri";

const Search = () => {



    return (
        <div className="search-form flex flex-center card">
            <form className='flex flex-between search-form-input'>
                <RiSearchLine className='icons title center m-l-5' />
                <input
                    className='center'
                    type="text"
                    placeholder='Search posts'
                />
            </form>

        </div>
    )
}

export default Search

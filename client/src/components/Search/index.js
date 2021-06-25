import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { RiSearchLine } from "react-icons/ri";
import { useQuery } from '@apollo/client';
import { FIND_POST } from '../../utils/queries';

const Search = () => {

    const [searchPost, setSearchPost] = useState('');
    // const { term } = useParams();
    const { loading, data } = useQuery(FIND_POST,
        {
            variables: {
                filter: searchPost
            }
        });

    const findPost = data || {};


    const handleChangeSearch = (event) => {
        console.log("from search=", searchPost);
        setSearchPost(event.target.value);
    }

    let history = useHistory();

    const handleSubmitSearch = async event => {
        event.preventDefault();
        try {
            await findPost;
            console.log("data= from search", data.findPost);
            setSearchPost('');
            history.push(`/search/${searchPost}`)

        } catch (err) {
            console.error(err);
        }

    }


    return (
        <div className="search-form flex flex-center card">
            <form className='flex flex-between search-form-input'
                onSubmit={handleSubmitSearch}
            >
                <RiSearchLine className='icons title center m-l-5' />
                <input
                    className='center'
                    type="text"
                    placeholder='Search posts'
                    onChange={handleChangeSearch}
                />
            </form>
            {/* {findPost.length && (
                <Link className='link' to={`/search/${searchPost}`}>Posts</Link>
            )

            } */}

        </div>
    )
}

export default Search

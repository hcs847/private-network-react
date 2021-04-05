import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';



const PostForm = () => {

    // create a post and update graphql
    const [addEvent, { error }] = useMutation(ADD_POST);

    // handling state for post form fields
    const [postState, setPostState] = useState({
        title: '',
        body: '',
        post_img: ''
    });
    const handleChangePostForm = () => {

    }

    const handleSubmitPostForm = () => {

    }

    return (
        <div className='post-form center'>
            <h2 className='form-title'>Create a Post</h2>
            <form className='flex flex-columns' onSubmit={handleSubmitPostForm}>
                <div className='flex flex-between'>
                    <label htmlFor="title">Post title</label>
                    <input
                        type="text"
                        name="title"
                        value={postState.title}
                        onChange={handleChangePostForm}
                    />
                </div>
                <div className='flex flex-between'>
                    <label htmlFor="body">Post body</label>
                    <textarea
                        placeholder='What would you like to say?'
                        name='body'
                        type="text"
                        value={postState.body}
                        onChange={handleChangePostForm}
                    />
                </div>
                <div className='flex flex-between'>
                    <label htmlFor="post_img">Photo</label>
                    <input
                        type="text"
                        name="post_img"
                        value={postState.post_img} />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default PostForm;

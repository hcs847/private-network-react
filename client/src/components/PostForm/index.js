import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';



const PostForm = () => {

    // create a post and update graphql
    const [addPost, { error }] = useMutation(ADD_POST);

    // handling state for post form fields
    const [postState, setPostState] = useState({
        title: '',
        body: '',
        post_img: ''
    });
    const handleChangePostForm = (event) => {
        const { name, value } = event.target;
        setPostState({
            ...postState,
            // dynamically assigning value entered to related field name
            [name]: value
        })
    }
    // when from is submited, graphql to be updated asynchronously 
    const handleSubmitPostForm = async event => {
        // disable default browser behavior on submit
        event.preventDefault();


        console.log(postState);
        try {
            await addPost({
                // syntax for passing form entries as input type PostInput
                variables: { input: { ...postState } }
            });
            setPostState({
                title: '',
                body: '',
                post_img: ''
            });
        } catch (err) {
            console.error(err);
        }
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
                        value={postState.post_img}
                        onChange={handleChangePostForm}
                    />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default PostForm;

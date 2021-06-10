import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS } from '../../utils/queries';
import GroupDropdown from '../GroupDropdown';
import { GrClose } from 'react-icons/gr';



const PostForm = ({ showPostForm, onPost, groups }) => {

    // create a post and update graphql
    const [addPost, { error }] = useMutation(ADD_POST);

    // handling state for post form fields
    const [postState, setPostState] = useState({
        postGroup: '',
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
        // console.log(postState);
        try {
            await addPost({
                // syntax for passing form entries as input type PostInput
                variables: { input: { ...postState } },

                // updating cache manually after mutation to avoid refetching from server
                update: (cache, { data: { addPost } }) => {
                    try {
                        // reading the current query from cache
                        const data = cache.readQuery({ query: QUERY_POSTS });
                        // adding data created by mutation
                        data.posts = [...data.posts, addPost];
                        // caching the updated data
                        cache.writeQuery({
                            query: QUERY_POSTS,
                            data
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
            setPostState({
                postGroup: '',
                title: '',
                body: '',
                post_img: ''
            });
            onPost();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {!showPostForm ? (
                <div className='post-form center'>
                    <button className='btn-modal' type='button' onClick={onPost}>Start a Post</button>
                </div>
            ) : (

                <div className="modal-overlay">
                    <div className='form-modal'>
                        <div className='flex flex-around'>
                            <h3 style={{ display: 'inline-block' }} className='form-title'>Create a Post</h3>
                            <button style={{ marginLeft: 'auto' }} type='button' className='icons icon-x' onClick={onPost}><GrClose /></button>
                        </div>

                        <form className={`flex flex-columns ${!showPostForm ? 'no-display' : ''}`} onSubmit={handleSubmitPostForm}>

                            <GroupDropdown groups={groups} getGroupId={handleChangePostForm} />

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
                </div>
            )
            }
        </>
    )
}

export default PostForm;

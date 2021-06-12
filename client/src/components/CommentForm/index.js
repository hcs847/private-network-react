import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../utils/mutations';
import { QUERY_POSTS } from '../../utils/queries';
import { CgComment } from "react-icons/cg";


const CommentForm = ({ postId, toggleCommentForm, showCommentForm, comments, commentCount }) => {

    // add a comment and update graphql
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    // handle state for comment form
    const [commentState, setCommentState] = useState({ commentBody: '' });

    const handleChangeCommentForm = (event) => {
        setCommentState({
            ...commentState,
            commentBody: event.target.value
        });
    };

    const handleSubmitCommentForm = async event => {
        event.preventDefault();

        try {
            debugger
            await addComment({
                variables: { postId, ...commentState },
                update: (cache, { data: { addComment } }) => {
                    try {
                        const postData = cache.readQuery({ query: QUERY_POSTS });
                        const filteredData = postData?.posts.filter(id => id._id !== postId);
                        postData.posts && cache.writeQuery({
                            query: QUERY_POSTS,
                            data: [...filteredData, addComment]
                        }
                        );

                    } catch (err) {
                        console.log(err);
                    }
                }
            });

            setCommentState({
                commentBody: '',
            });
            toggleCommentForm();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className='add-comment'>
                <button className='btn-no-styling flex add-comment-btn med-gray-font' onClick={toggleCommentForm}><CgComment /> <span className='bold'>Comment</span></button>
            </div>
            {showCommentForm && (
                <form className="add-comment-box flex flex-center" onSubmit={handleSubmitCommentForm}>

                    <label htmlFor="commentBody"></label>
                    <input
                        className='comment-input'
                        type="text"
                        name='commentBody'
                        placeholder='Add a comment'
                        value={commentState.commentBody}
                        onChange={handleChangeCommentForm}
                    />
                    {error && <p className='errors'>There was a problem with processing your request.</p>}
                </form>
            )
            }
        </>
    )
}

export default CommentForm

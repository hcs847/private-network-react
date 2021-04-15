import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../utils/mutations';
import { CgComment } from "react-icons/cg";


const CommentForm = ({ postId, toggleCommentForm, showCommentForm }) => {

    // add a comment and update graphql
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    // handle state for comment form
    const [commentState, setCommentState] = useState({ commentBody: '' });

    const handleChangeCommentForm = (event) => {
        setCommentState({
            ...commentState,
            commentBody: event.target.value
        });
        // console.log("handleChange: ", commentState);
    }

    const handleSubmitCommentForm = async event => {
        event.preventDefault();
        try {
            await addComment({
                variables: { postId, ...commentState }
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
                </form>
            )
            }
        </>
    )
}

export default CommentForm

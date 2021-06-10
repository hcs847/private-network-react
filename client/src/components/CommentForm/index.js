import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../utils/mutations';
import { CgComment } from "react-icons/cg";


const CommentForm = ({ postId, toggleCommentForm, showCommentForm, comments, commentCount }) => {

    // add a comment and update graphql
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    // handle state for comment form
    const [commentState, setCommentState] = useState({ commentBody: '' });

    // capture updated comments array when posting a comment
    const [numberOfComments, setnumberOfComments] = useState(commentCount);

    const handleChangeCommentForm = (event) => {
        setCommentState({
            ...commentState,
            commentBody: event.target.value
        });
    }

    const handleSubmitCommentForm = async event => {
        event.preventDefault();
        try {
            const { data } = await addComment({
                variables: { postId, ...commentState }
            });
            setnumberOfComments(data.addComment.commentCount);
            console.log(await data.addComment.commentCount, "comments count", comments);
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

import React from 'react'

const Comments = ({ comments }) => {
    return (
        <>
            <h4>Comments</h4>
            <ul className='comments-list'>
                {
                    comments &&
                    comments.map(comment => (
                        <li className='comments-list__item' key={comment._id}>{comment.commentBody} by <span className='created-by'>{comment.email}</span></li>
                    ))
                }
            </ul>
        </>
    )
}

export default Comments

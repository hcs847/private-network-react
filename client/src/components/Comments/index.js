import React from 'react'

const Comments = ({ comments, showComments, onComments, commentCount }) => {
    return (
        <>
            {commentCount && (<button type='button' className='btn-no-styling' onClick={onComments}>{commentCount} Comments</button>)}
            <ul className={`${showComments ? 'comments-list' : 'no-display'}`}>
                {
                    comments &&
                    comments.map(comment => (
                        <li className='comment-list__item flex flex-columns' key={comment._id}>
                            <p className='created-by-on'>
                                {comment.firstName} {comment.lastName}
                                <span style={{ fontWeight: 'lighter', paddingLeft: '5px' }}>{comment.createdAt}</span></p>
                            <p className='comment-list__body'>{comment.commentBody}</p></li>
                    ))
                }
            </ul>
        </>
    )
}

export default Comments

import React from 'react';
import pluralFormat from '../../utils/helpers';

const Likes = ({ toggleLikes, showLikes, likeCount, likes }) => {
    return (
        <>
            {(likeCount > 0) &&
                (
                    <button type='button'
                        className='btn-no-styling flex med-gray-font bold'
                        onClick={toggleLikes}
                    >
                        {likeCount}
                        {' '}
                        {pluralFormat('like', likeCount)}
                    </button>
                )
            }
            <ul className={`${showLikes ? 'comments-list' : 'no-display'}`}>
                {
                    likes &&
                    likes.map(like => (
                        <li className='like-list__item flex flex-columns' key={like._id}>
                            <p className='created-by-on'>
                                {like.likedByName}
                            </p>
                        </li>

                    ))
                }
            </ul>
        </>
    )
}

export default Likes

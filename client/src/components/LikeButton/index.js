import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST } from '../../utils/mutations';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ postId, usersId, likes }) => {

    const [likePost, { error }] = useMutation(LIKE_POST);

    // check if user liked the post
    const liked = likes.filter(post => post.likedById === usersId);

    const handleLikePost = async event => {
        event.preventDefault();
        if (!liked.length) {
            try {
                await likePost({
                    variables: { postId }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className="like-post">
            <button className='btn-no-styling flex add-comment-btn med-gray-font'
                onClick={handleLikePost}>
                {liked.length ? (
                    <div className='navy-font'><AiFillLike /></div>
                ) : (
                    <AiOutlineLike />
                )
                }
                <span className='bold'>Like</span></button>
        </div>
    )
}

export default LikeButton

import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST, UNLIKE_POST } from '../../utils/mutations';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ postId, usersId, likes }) => {

    const [likePost, { error }] = useMutation(LIKE_POST);
    const [unlikePost, { error: unlikeError }] = useMutation(UNLIKE_POST);

    // check if user liked the post
    const liked = likes.filter(post => post.likedById === usersId);

    const handleLikePost = async event => {
        event.preventDefault();
        // console.log('handle like', likes.filter(like => like.likedById === usersId)[0]?._id);
        try {
            if (!liked.length) {
                await likePost({
                    variables: { postId }
                });
            } else {
                await unlikePost({
                    variables: { postId }
                });
            }
        } catch (err) {
            console.log(err);
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

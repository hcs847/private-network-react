import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST, UNLIKE_POST } from '../../utils/mutations';
import { QUERY_POSTS } from '../../utils/queries';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ postId, usersId, likes }) => {

    const [likePost, { error }] = useMutation(LIKE_POST);
    const [unlikePost, { error: unlikeError }] = useMutation(UNLIKE_POST);

    // check if user liked the post
    const liked = likes?.filter(post => post.likedById === usersId);

    const handleLikePost = async event => {
        event.preventDefault();
        try {
            if (!liked.length) {
                await likePost({
                    variables: { postId },
                    update: (cache, { data: likePost }) => {
                        try {
                            const likeData = cache.readQuery({ query: QUERY_POSTS });
                            const filteredLikeData = likeData.posts.filter(id => id._id !== postId);
                            likeData && cache.writeQuery({
                                query: QUERY_POSTS,
                                data: [...filteredLikeData, likePost]
                            });
                            console.log("data=", likeData);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                });
            } else {
                await unlikePost({
                    variables: { postId }
                });
                console.log(await likes, "==likes from unlike");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="like-post">
            <button className='btn-no-styling flex add-comment-btn med-gray-font'
                onClick={handleLikePost}>
                {liked?.length ? (
                    <div className='navy-font'><AiFillLike /></div>
                ) : (
                    <AiOutlineLike />
                )
                }
                <span className='bold'>Like</span></button>
            {(error || unlikeError) && <p>There was an error with your request.</p>}
        </div>
    )
}

export default LikeButton

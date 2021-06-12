import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST, UNLIKE_POST } from '../../utils/mutations';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ postId, usersId, likes, likeCount }) => {

    const [likePost, { error }] = useMutation(LIKE_POST);
    const [unlikePost, { error: unlikeError }] = useMutation(UNLIKE_POST);

    // check if user liked the post
    const liked = likes?.filter(post => post.likedById === usersId);

    // // capture likeCount for re rendering on like or unlike
    // const [numberOfLikes, setNumberOfLikes] = useState(likeCount);


    const handleLikePost = async event => {
        event.preventDefault();
        try {
            if (!liked.length) {
                await likePost({
                    variables: { postId }

                });
                // setNumberOfLikes(data.likePost.likeCount);


            } else {
                await unlikePost({
                    variables: { postId }
                });
                // setNumberOfLikes(data.unlikePost.likeCount);

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

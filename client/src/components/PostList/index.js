import React from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton';
import Likes from '../Likes';
import Comments from '../Comments';
import CommentForm from '../CommentForm';

const PostList = ({ posts, showComments, onComments, showCommentForm, toggleCommentForm, commentsPost, toggleLikes, showLikes, usersId }) => {
    if (!posts.length) {
        return <h3>No posts yet.</h3>;
    }

    return (
        <div className="post-list flex flex-columns center">
            {posts &&
                posts.map(post => (

                    <div key={post._id} className="card">
                        <p><Link className='link' to={`/profile/${post.createdById}`}>{post.createdByName}</Link></p>
                        <p>{post.body}</p>
                        <div className="card-image flex flex-columns">
                            <img className='post-img' src={post.post_img} alt="" />
                            <h5>{post.title}</h5>
                        </div>
                        <div className="flex interactions">
                            <div className="comments-card flex flex-columns">
                                <Comments
                                    comments={post.comments}
                                    commentCount={post.commentCount}
                                    showComments={showComments}
                                    onComments={onComments}
                                    commentsPost={commentsPost}
                                    postId={post._id} />
                            </div>
                            <Likes
                                likeCount={post.likeCount}
                                toggleLikes={toggleLikes}
                                showLikes={showLikes}
                                likes={post.likes}
                            />
                        </div>
                        <div className="flex interactions">
                            <LikeButton
                                postId={post._id}
                                likes={post.likes}
                                usersId={usersId}
                            />
                            <CommentForm
                                postId={post._id}
                                showCommentForm={showCommentForm}
                                toggleCommentForm={toggleCommentForm}
                                comments={post.comments}
                                commentCount={post.commentCount}
                                commentsPost={commentsPost}
                            />
                        </div>
                    </div>

                ))

            }
        </div>
    )
}

export default PostList

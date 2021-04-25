import React from 'react';
import { Link } from 'react-router-dom';
import Comments from '../Comments';
import CommentForm from '../CommentForm';

const PostList = ({ posts, showComments, onComments, showCommentForm, toggleCommentForm }) => {
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
                        <div className="comments-card">
                            <Comments
                                comments={post.comments}
                                commentCount={post.commentCount}
                                showComments={showComments}
                                onComments={onComments} />
                        </div>
                        <CommentForm
                            postId={post._id}
                            showCommentForm={showCommentForm}
                            toggleCommentForm={toggleCommentForm} />
                    </div>

                ))

            }
        </div>
    )
}

export default PostList

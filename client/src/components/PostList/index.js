import React from 'react';
import Comments from '../Comments';

const PostList = ({ posts, showComments, onComments }) => {
    if (!posts.length) {
        return <h3>No posts yet.</h3>;
    }

    return (
        <div className="post-list flex flex-columns center">
            {posts &&
                posts.map(post => (

                    <div key={post._id} className="card">

                        <p>{post.body}</p>
                        <div className="card-image flex flex-columns">
                            <img className='post-img' src={post.post_img} alt="" />
                            <h5>{post.title}</h5>
                        </div>
                        <div className="comments-card">
                            <Comments comments={post.comments}
                                commentCount={post.commentCount}
                                showComments={showComments}
                                onComments={onComments} />
                        </div>
                    </div>

                ))

            }
        </div>
    )
}

export default PostList

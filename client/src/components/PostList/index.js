import React from 'react';
import Comments from '../Comments';

const PostList = ({ posts }) => {
    if (!posts.length) {
        return <h3>No posts yet.</h3>;
    }
    return (
        <div className="post-list flex flex-columns center">
            {posts &&
                posts.map(post => (

                    <div key={post._id} className="card">
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                        <img className='post-img' src={post.post_img} alt="" />
                        <div className="comments-card">
                            <Comments comments={post.comments} />
                        </div>
                    </div>

                ))

            }
        </div>
    )
}

export default PostList

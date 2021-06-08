import React from 'react';
import pluralFormat from '../../utils/helpers';

const Likes = ({ likeCount }) => {
    return (
        <>
            {(likeCount > 0) &&
                (
                    <button type='button' className=" btn-no-styling flex med-gray-font bold">
                        {likeCount}
                        {' '}
                        {pluralFormat('like', likeCount)}
                    </button>
                )
            }
        </>
    )
}

export default Likes

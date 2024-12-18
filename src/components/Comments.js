import React from 'react';
import Comment from './Comment';

const Comments = ({ comments }) => {
    return (
        <div className="comments-section">
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </div>
    );
};

export default Comments;

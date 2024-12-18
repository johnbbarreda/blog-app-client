import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <p>
                <strong>{comment.authorId ? comment.authorId.username : 'Unknown User'}</strong>: {comment.content}
            </p>
        </div>
    );
};

export default Comment;

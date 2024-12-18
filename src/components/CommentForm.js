import React, { useState } from 'react';

const CommentForm = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Use 'token' key to get the token
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            const newComment = await response.json();
            onCommentAdded(newComment); // Callback to notify parent of new comment
            setContent(''); // Clear the input field
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Add a Comment</label>
                <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Submit Comment</button>
        </form>
    );
};

export default CommentForm;

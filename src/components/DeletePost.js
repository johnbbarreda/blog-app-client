import React, { useContext } from 'react';
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 
import UserContext from '../context/UserContext';

const DeletePost = ({ postId, postAuthorId, onDeleteSuccess }) => {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) throw new Error('Failed to delete post');
            notyf.success('Post deleted successfully!');
            onDeleteSuccess();
        } catch (error) {
            console.error("Error deleting post:", error);
            notyf.error(error.message);
        }
    };

    // Here, replace `post.authorId` with `postAuthorId`
    if (!user || (user.id !== postAuthorId && !user.isAdmin)) {
        return null;
    }

    return (
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete Post
        </button>
    );
};

export default DeletePost;

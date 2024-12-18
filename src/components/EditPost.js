import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 
import UserContext from '../context/UserContext'; // Import UserContext
import DeletePost from '../components/DeletePost'; // Import DeletePost component

const EditPost = () => {
    const { id } = useParams(); // Get post ID from URL
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const notyf = new Notyf(); // Initialize Notyf for notifications
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Access user context

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`);
                if (!response.ok) throw new Error('Post not found');
                const postData = await response.json();
                setPost(postData);
                setTitle(postData.title);
                setContent(postData.content);
            } catch (error) {
                console.error("Error fetching post:", error);
                notyf.error(error.message); // Show error notification
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if available
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) throw new Error('Failed to update post');
            const updatedPost = await response.json();
            notyf.success('Post updated successfully!'); // Show success notification
            navigate(`/posts/${updatedPost._id}`); // Redirect to the updated post detail page
        } catch (error) {
            console.error("Error updating post:", error);
            notyf.error(error.message); // Show error notification
        }
    };

    if (!post) return <p>Loading...</p>; // Loading state

    return (
        <div className="container mt-4">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea 
                        className="form-control" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Post</button>

                {(post.authorId.toString() === user?.id || user?.isAdmin) && (
                    <DeletePost postId={post._id} onDeleteSuccess={() => navigate('/')} />
                )}
            </form>
        </div>
    );
};

export default EditPost;

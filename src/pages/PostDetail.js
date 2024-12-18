import React, { useEffect, useState, useContext } from 'react';
import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm'; // Import CommentForm
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext'; // Import UserContext

const PostDetail = () => {
    const { id } = useParams(); // Get post ID from URL
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext); // Access user context
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // Fetch the post details
                const postResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`);
                if (!postResponse.ok) throw new Error('Post not found');
                const postData = await postResponse.json();
                setPost(postData);

                // Fetch comments for the post
                const commentsResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}/comments`);
                if (!commentsResponse.ok) throw new Error('Comments not found');
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
                
            } catch (error) {
                console.error("Error fetching post or comments:", error);
                setError(error.message); // Set error message to display
            }
        };

        fetchPostAndComments();
    }, [id]); // Use id directly from useParams

    const handleCommentAdded = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]); // Add new comment to state
    };

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (!post) return <p>Loading...</p>; // Optional loading state

    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            {/* Show Edit button only if the user is the author */}
            {user && user.id === post.authorId.toString() && (
                <button 
                    className="btn btn-secondary" 
                    onClick={() => navigate(`/edit/${post._id}`)}
                >
                    Edit Post
                </button>
            )}

            {/* Render Comments */}
            <Comments comments={comments} />
            
            {/* Comment Form */}
            <CommentForm postId={post._id} onCommentAdded={handleCommentAdded} />
        </>
    );
};

export default PostDetail;

import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import { Button } from 'react-bootstrap'; // Import Bootstrap button

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null); // State to hold any errors
    const [showAddPost, setShowAddPost] = useState(false); // State to control visibility of AddPost

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError(error.message); // Set error message in state
            }
        };
        
        fetchPosts();
    }, []);

    // Function to handle new post submission
    const handleNewPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]); // Add the new post to the state
    };

    return (
        <div className="container mt-4">
            <h1>Blog Posts</h1>
            {error && <p className="text-danger">{error}</p>} {/* Display error message */}
            
            {/* Button to toggle Add Post visibility */}
            <Button 
                variant="success" 
                className="mb-3" 
                onClick={() => setShowAddPost(true)}
            >
                Add Post
            </Button>

            {/* Render Add Post as a modal */}
            <AddPost 
                showModal={showAddPost} 
                handleClose={() => setShowAddPost(false)} 
                onPostAdded={handleNewPost} 
            />

            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map(post => (
                    <Post key={post._id} post={post} />
                ))
            )}
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';

const Post = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                    {isExpanded ? post.content : `${post.content.substring(0, 100)}...`}
                </p>
                <p className="card-text">
                    <small className="text-muted">
                        By {post.authorId.username} on {new Date(post.createdAt).toLocaleDateString()}
                    </small>
                </p>
                <Link to={`/posts/${post._id}`} className="btn btn-primary">View Full Post</Link>
                <Link to={`/edit/${post._id}`} className="btn btn-secondary ml-2">Edit</Link>
                <DeletePost postId={post._id} postAuthorId={post.authorId} onDeleteSuccess={() => window.location.reload()} />
            </div>
        </div>
    );
};

export default Post;

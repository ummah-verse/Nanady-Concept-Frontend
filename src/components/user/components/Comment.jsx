// Comment.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './styles/Comment.css';
import { IoIosSend } from "react-icons/io";

const Comment = ({ yappinId }) => {

    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State untuk menangani error

    // Fetch comments ketika komponen dimuat atau yappinId berubah
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/api/yapping/${yappinId}/comments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Sertakan token Bearer
                    }
                });

                const result = await response.json();
                if (result.status) {
                    setComments(result.data); // Set data komentar
                } else {
                    setError(result.message || 'Failed to fetch comments');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError('Error fetching comments');
                setLoading(false);
            }
        };

        fetchComments();
    }, [yappinId]);

    // Handle input comment
    const handleCommentInput = (e) => {
        setNewComment(e.target.value);
    };

    // Handle submitting new comment
    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) return;

        try {
            const token = localStorage.getItem('token');

            console.log(newComment)
            const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/api/yapping/${yappinId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Sertakan token Bearer
                },
                body: JSON.stringify({ 
                    yappin_id: yappinId,  // Sertakan yappin_id dalam body
                    content: newComment   // Sertakan content komentar
                })
            });

            const result = await response.json();

            console.log(result)
            if (result.status) {
                // Tambahkan komentar baru ke daftar tanpa mengambil ulang semua komentar
                setComments([...comments, result.data]);
                setNewComment(''); // Kosongkan field input
            } else {
                setError(result.message || 'Failed to add comment');
                console.error('Error adding comment:', result.message);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            setError('Error posting comment');
        }
    };

    if (loading) {
        return (
            <div className="skeleton-wrapper">
                <div className="skeleton-comment">
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>
                <div className="skeleton-comment">
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>
                <div className="skeleton-comment">
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`comment-section `}>
            {/* Menampilkan Error Jika Ada */}
            {error && <p className="error-message">{error}</p>}

            {/* Display Comments */}
            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <p>
                                <strong>{comment.users?.username || 'Unknown User'}</strong>: {comment.content}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>

            {/* Add New Comment */}
            <form onSubmit={handleSubmitComment} className="new-comment-form">
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentInput}
                    placeholder="Add a comment..."
                    className={`comment-input ${darkMode === 'dark' ? 'text-white bg-neutral-700' : 'bg-neutral-200 text-black'}`}
                />
                <button type="submit" className="comment-submit"><IoIosSend size={20} /></button>
            </form>
        </div>
    );
};

// Definisikan PropTypes untuk komponen Comment
Comment.propTypes = {
    yappinId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Comment;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiLike, BiSolidLike } from "react-icons/bi"; // Ikon like
import { GoComment } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import './styles/YappingDetail.css';

import Comment from './user/components/Comment'; // Import Comment Component

const YappingDetail = () => {
    const { id } = useParams(); // Get the Yapping post ID from the URL
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);

    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/yapping/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the Bearer token
                    }
                });

                const result = await response.json();
                if (result.status) {
                    setPostData(result.data); // Save the post data
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleLike = async () => {
        // Optimistic update for likes
        setPostData(prevPostData => ({
            ...prevPostData,
            isLiked: !prevPostData.isLiked,
            total_likes: prevPostData.isLiked ? prevPostData.total_likes - 1 : prevPostData.total_likes + 1
        }));

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/api/users/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ yappin_id: id })
            });

            const result = await response.json();
            if (!result.status) {
                // Rollback if there's an error
                setPostData(prevPostData => ({
                    ...prevPostData,
                    isLiked: !prevPostData.isLiked,
                    total_likes: prevPostData.isLiked ? prevPostData.total_likes + 1 : prevPostData.total_likes - 1
                }));
                console.error('Failed to like/unlike the post:', result.message);
            }
        } catch (error) {
            console.error('Error in handleLike:', error);
        }
    };

    if (loading) {
        return <p></p>;
    }

    if (!postData) {
        return <p>Post not found</p>;
    }

    return (
        // <div className={`yapping-detail-container flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] border-neutral-950 text-gray-900 font-semibold shadow-xl border-4 mb-2'}`}>
        <div className={`yapping-detail-container mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>

            <div className="yapping-post-detail shadow-md p-5">
                {/* User Info */}
                <div className="flex items-start mb-4">
                    <img
                        className="w-12 h-12 image-icon rounded-full"
                        src={postData.users.avatar_link || `https://ik.imagekit.io/eoeykxtr4/wakwaw.png?updatedAt=1729922813457`}
                        alt="Profile"
                    />
                    <div className="ml-4">
                        <p className="text-lg font-semibold">{postData.users.username}</p>
                        <p className="text-gray-500">{postData.caption}</p>
                    </div>
                </div>

                {/* Media */}
                {postData.yappin_image.length > 0 ? (
                    postData.yappin_image.map((media, idx) => (
                        media.type === 'VIDEO' ? (
                            <video key={idx} className="w-full mb-4" controls>
                                <source src={media.image_link} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                key={idx}
                                className="w-full mb-4"
                                src={media.image_link}
                                alt={`Post media ${idx}`}
                            />
                        )
                    ))
                ) : (
                    <p>No images available</p>
                )}

                {/* Reactions */}
                <div className="reaction flex items-center justify-between mt-4">
                    <div className="like-comment flex items-center gap-5">
                        <button 
                            className="flex items-center" 
                            onClick={handleLike}
                        >
                            {postData.isLiked ? <BiSolidLike className="text-red-500" /> : <BiLike />}
                            <span className="ml-2">{postData.total_likes}</span>
                        </button>
                        <button className="flex items-center">
                            <GoComment className="comment-icon" />
                            <span className="ml-2">{postData.total_comments || 0}</span>
                        </button>
                    </div>
                    <div className="post-meta flex gap-5">
                        <div className="flex items-center">
                            <IoLocationOutline />
                            <p className="ml-2">{postData.location || '-'}</p>
                        </div>
                        <div className="flex items-center">📅
                            <p className="ml-2">{new Date(postData.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <Comment yappinId={id} />
            </div>
        </div>
    );
};

export default YappingDetail;

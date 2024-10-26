import { useState, useEffect } from 'react';
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi"; // Ikon untuk like yang aktif
import { GoComment } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import './styles/Yapping.css';

const Yapping = () => {
    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch posts from API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const hide = JSON.parse(localStorage.getItem('selectedCategories') || '{}'); // Fallback to empty object if not found

                console.log(hide)

                const queryParams = new URLSearchParams(hide).toString(); 

                console.log(queryParams)

                const response = await fetch(`${import.meta.env.VITE_API_URL}/yapping?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the Bearer token
                    }
                });

                

                const result = await response.json();
                
                if (result.status) {
                    // Asumsikan setiap post memiliki properti 'isLiked'
                    const updatedPosts = result.data.map(post => ({
                        ...post,
                        isLiked: post.isLiked || false // Pastikan ada properti isLiked
                    }));
                    setPostsData(updatedPosts);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, []);


    const openPopup = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setSelectedImage('');
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            setVisiblePosts(prevVisiblePosts => Math.min(prevVisiblePosts + 6, postsData.length));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    // Fungsi untuk menangani like/unlike
    const handleLike = async (postId) => {
        // Optimistic UI Update: langsung ubah status isLiked dan total_likes
        setPostsData(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        isLiked: !post.isLiked,
                        total_likes: post.isLiked ? post.total_likes - 1 : post.total_likes + 1
                    }
                    : post
            )
        );
    
        try {
            const token = localStorage.getItem('token');
    
            // Send the request to the server
            const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/api/users/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ yappin_id: postId })
            });
    
            const result = await response.json();
    
            if (!result.status) {
                // Jika server mengembalikan status false, rollback ke state semula
                setPostsData(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId
                            ? {
                                ...post,
                                isLiked: !post.isLiked, // Balik lagi ke status awal
                                total_likes: post.isLiked ? post.total_likes + 1 : post.total_likes - 1 // Balik lagi ke jumlah awal
                            }
                            : post
                    )
                );
                console.error('Failed to like/unlike the post:', result.message);
            }
        } catch (error) {
            // Jika terjadi error, rollback ke state semula
            setPostsData(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? {
                            ...post,
                            isLiked: !post.isLiked, // Balik lagi ke status awal
                            total_likes: post.isLiked ? post.total_likes + 1 : post.total_likes - 1 // Balik lagi ke jumlah awal
                        }
                        : post
                )
            );
            console.error('Error in handleLike:', error);
        }
    };
    

    const renderPosts = postsData.slice(0, visiblePosts).map((postData, index) => (
        <NavLink className="yapping-post" key={index}>
            <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            {/* <div className={`flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] border-neutral-950 text-gray-900 font-semibold shadow-xl border-4 mb-2'}`}> */}
            {/* Profile Image */}
                <img
                    className="w-10 h-10 image-icon rounded-full flex items-center"
                    src={postData.users.avatar_link || `https://ik.imagekit.io/eoeykxtr4/wakwaw.png?updatedAt=1729922813457`} 
                    alt="Profile"
                />
                {/* Content */}
                <div className="ml-4 w-full">
                    {/* Username and Caption */}
                    <p className={`${darkMode === 'dark' ? 'text-lg font-semibold text-gray-200 ' : 'text-neutral-900 font-semibold'}`}                    >{postData.users.username}</p>
                    <p  style={ { fontSize : '14px'}} className={`mb-2 ${darkMode === 'dark' ? 'font-semibold text-gray-200 text-sm mb-2 ' : 'text-neutral-900 font-semibold'}`}>{postData.caption}</p>

                    {/* Post Media */}
                    {postData.yappin_image.length > 0 ? (
                        postData.yappin_image.map((media, idx) => (
                            media.type === 'VIDEO' ? (
                                <video
                                    key={idx}
                                    className="w-full h-max object-cover mb-2 max-h-full cursor-pointer"
                                    controls
                                    onClick={() => openPopup(media.image_link)}
                                >
                                    <source src={media.image_link} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    key={idx}
                                    className="w-full h-max object-cover mb-2 max-h-full cursor-pointer"
                                    src={media.image_link}
                                    alt={`Post ${idx}`}
                                    onClick={() => openPopup(media.image_link)}
                                />
                            )
                        ))
                    ) : (
                        <p>No images available</p>
                    )}

                    {/* Reactions */}
                    <div className="reaction flex items-center text-gray-300 justify-between">
                        <div className="like-comment flex items-center text-gray-300 mt-5 gap-5">
                            <button 
                                className="flex items-center hover:text-red-500" 
                                onClick={(e) => { 
                                    e.preventDefault(); // Mencegah navigasi NavLink
                                    handleLike(postData.id);
                                }}
                            >
                                {postData.isLiked ? <BiSolidLike className="like-icon text-red-500" /> : <BiLike className={`like-icon ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}/>}
                                <span className={`ml-1 like-content ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}>{postData.total_likes}</span>
                            </button>
                            <button className="flex items-center hover:text-blue-500">
                                <NavLink className='flex' to={`/yapping/${postData.id}`}>
                                    <GoComment className={`comment-icon ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`} />
                                    <span className={`ml-1 comment-content ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}>{postData.total_comments || 0}</span>
                                </NavLink>
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <div className={`flex items-center mt-5 ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}>
                                <IoLocationOutline className="location-icon" />
                                <p className="date-content ml-1">
                                    {postData.location ?? '-'}
                                </p>
                            </div>
                            <div className={`flex items-center mt-5 ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}>📅
                                <p className="date-content ml-1">
                                    {new Date(postData.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    ));

    return (
        <div>
            {loading ? <p></p> : renderPosts}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closePopup}>
                    <div className='popup-image-container'>
                        <div className="relative max-w-full mx-auto p-4 bg-transparent" onClick={(e) => e.stopPropagation()}>
                            <img src={selectedImage} alt="Popup" className="rounded-lg max-w-full max-image-popup object-contain" />
                            <button className="absolute top-7 right-10 text-white text-2xl" onClick={closePopup}>&times;</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Yapping;

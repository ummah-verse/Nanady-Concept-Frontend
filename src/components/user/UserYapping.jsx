// import { useState, useEffect } from 'react';
// import { BiLike } from "react-icons/bi";
// import { GoComment } from "react-icons/go";
// import { IoLocationOutline } from "react-icons/io5";
// import { NavLink } from 'react-router-dom';
// import './styles/UserYapping.css';

// const UserYapping = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedImage, setSelectedImage] = useState('');
//     const [visiblePosts, setVisiblePosts] = useState(6);
//     const [postsData, setPostsData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch posts from API
//     useEffect(() => {
//         const fetchPosts = async () => {

//             const token = localStorage.getItem('token');

//             try {
//                 const response = await fetch(`${import.meta.env.VITE_API_URL}/my-yapping`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}` // Include the Bearer token
//                     }
//                 });
    
//                 const result = await response.json();

//                 console.log(result)
                
//                 if (result.status) {
//                     setPostsData(result.data);
//                     console.log(result.data[0].yappin_image)
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching posts:", error);
//                 setLoading(false);
//             }
//         };
    
//         fetchPosts();
//     }, []);
    

//     const openPopup = (image) => {
//         setSelectedImage(image);
//         setIsOpen(true);
//     };

//     const closePopup = () => {
//         setIsOpen(false);
//         setSelectedImage('');
//     };

//     const handleScroll = () => {
//         if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
//             setVisiblePosts(prevVisiblePosts => Math.min(prevVisiblePosts + 6, postsData.length));
//         }
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     });

//     const renderPosts = postsData.slice(0, visiblePosts).map((postData, index) => (
//         <NavLink key={index} to={`/yapping/${postData.id}`}>
//             <div className="flex items-start p-3 pb-5 px-6 pl-5 pt-4 shadow-md yapping-post">
//                 {/* Profile Image */}
//                 <img
//                     className="w-10 h-10 image-icon rounded-full flex items-center"
//                     src={postData.users.avatar_link || '/public/wakwaw.png'} 
//                     alt="Profile"
//                 />
//                 {/* Content */}
//                 <div className="ml-4 w-full">
//                     {/* Username and Caption */}
//                     <p className="text-lg font-semibold text-gray-200">{postData.users.username}</p>
//                     <p className="text-gray-300 text-sm mb-2">{postData.caption}</p>

//                     {/* Post Media */}
//                     {postData.yappin_image.length > 0 ? (
//                         postData.yappin_image.map((media, idx) => (
//                             media.type === 'VIDEO' ? (
//                                 <video
//                                     key={idx}
//                                     className="w-full h-max object-cover mb-2 max-h-full cursor-pointer"
//                                     controls
//                                     onClick={() => openPopup(media.image_link)}
//                                 >
//                                     <source src={media.image_link} type="video/mp4" />
//                                     Your browser does not support the video tag.
//                                 </video>
//                             ) : (
//                                 <img
//                                     key={idx}
//                                     className="w-full h-max object-cover mb-2 max-h-full cursor-pointer"
//                                     src={media.image_link}
//                                     alt={`Post ${idx}`}
//                                     onClick={() => openPopup(media.image_link)}
//                                 />
//                             )
//                         ))
//                     ) : (
//                         <p>No images available</p>
//                     )}

//                     {/* Reactions */}
//                     <div className="reaction flex items-center text-gray-300 justify-between">
//                         <div className="like-comment flex items-center text-gray-300 mt-5 gap-5">
//                             <button className="flex items-center hover:text-red-500">
//                                 <BiLike className="like-icon" />
//                                 <span className="ml-1 like-content">{postData.total_likes}</span>
//                             </button>
//                             <button className="flex items-center hover:text-blue-500">
//                                 <GoComment className="comment-icon" />
//                                 <span className="ml-1 comment-content">{postData.total_comments || 0}</span>
//                             </button>
//                         </div>
//                         <div className="flex gap-5">
//                             <div className="flex items-center mt-5">
//                                 <IoLocationOutline className="location-icon" />
//                                 <p className="date-content ml-1">
//                                     {postData.location ?? '-'}
//                                 </p>
//                             </div>
//                             <div className="flex items-center mt-5">📅
//                                 <p className="date-content ml-1">
//                                     {new Date(postData.created_at).toLocaleDateString()}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </NavLink>
//     ));

//     return (
//         <div>
//             {loading ? <p></p> : renderPosts}
//             {isOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closePopup}>
//                     <div className='popup-image-container'>
//                         <div className="relative max-w-full mx-auto p-4 bg-transparent" onClick={(e) => e.stopPropagation()}>
//                             <img src={selectedImage} alt="Popup" className="rounded-lg max-w-full max-image-popup object-contain" />
//                             <button className="absolute top-7 right-10 text-white text-2xl" onClick={closePopup}>&times;</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserYapping;

// import { useState, useEffect } from 'react';
// import { BiLike } from "react-icons/bi";
// import { GoComment } from "react-icons/go";
// import { IoLocationOutline } from "react-icons/io5";
// import { NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './styles/UserYapping.css';

const UserYapping = () => {

    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    console.log("user yapping", darkMode)

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Tambahkan state error

    // Fetch posts from API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`${import.meta.env.VITE_API_URL}/my-yapping`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();

                console.log(result.data);

                if (result.status) {
                    // If result.data is an array, handle normally. If it's an object, wrap it in an array.
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                
                    const updatedPosts = data.map(post => ({
                        ...post,
                        isLiked: post.isLiked || false // Ensure the isLiked property exists
                    }));
                
                    setPostsData(updatedPosts);
                } else {
                    setError(result.message || 'Failed to fetch posts.');
                    console.error('Invalid data format:', result.data);
                }
                
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Terjadi kesalahan saat mengambil data posts.');
            } finally {
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
    // to={`/yapping/${postData.id}`}

    console.log(darkMode)
    const renderPosts = postsData.slice(0, visiblePosts).map((postData) => (
        <div className={`${darkMode === "dark" ? 'bg-neutral-900  shadow-md' : ''}`} key={postData.id}>
            <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            {/* Profile Image */}
                <img
                    className="w-10 h-10 image-icon rounded-full flex items-center"
                    src={postData.users.avatar_link || `https://ik.imagekit.io/eoeykxtr4/wakwaw.png?updatedAt=1729922813457`} 
                    alt="Profile"
                />
                {/* Content */}
                <div className="ml-4 w-full">
                    {/* Username and Caption */}
                    <p className={`text-lg font-semibold ${darkMode === "dark" ? 'text-white' : 'text-gray-900'}`}>{postData.users.username}</p>
                    <p className={`${darkMode === "dark" ? 'text-gray-400' : 'text-gray-900 font-semibold'} text-sm mb-2`}>{postData.caption}</p>
    
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
                    <div className="reaction flex items-center justify-between">
                        <div className="like-comment flex items-center mt-5 gap-5">
                            <button 
                                className={`flex items-center ${darkMode === "dark" ? 'text-white hover:text-red-500' : 'text-gray-900 font-bold hover:text-red-500'}`}
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    handleLike(postData.id);
                                }}
                            >
                                {postData.isLiked ? <BiSolidLike className="like-icon text-red-500" /> : <BiLike className="like-icon" />}
                                <span className="ml-1 like-content">{postData.total_likes}</span>
                            </button>
                            <button className={`flex items-center ${darkMode === "dark" ? 'text-white hover:text-blue-500' : 'text-gray-900 font-bold hover:text-blue-500'}`}>
                                <NavLink className='flex' to={`/yapping/${postData.id}`}>
                                    <GoComment className="comment-icon" />
                                    <span className="ml-1 comment-content">{postData.total_comments || 0}</span>
                                </NavLink>
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex items-center mt-5">
                                <IoLocationOutline className="location-icon" />
                                <p className="date-content ml-1">
                                    {postData.location ?? '-'}
                                </p>
                            </div>
                            <div className="flex items-center mt-5">📅
                                <p className="date-content ml-1">
                                    {new Date(postData.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));
    

    return (
        <div>
            {loading ? <p className="text-center text-gray-500"></p> : (
                !error ? renderPosts : <p className="text-center text-red-500">{error}</p>
            )}
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


export default UserYapping;

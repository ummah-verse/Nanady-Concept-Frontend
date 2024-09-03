import { useState, useEffect } from 'react';
import { BiLike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";

import './styles/UserYapping.css';

const UserYapping = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [visiblePosts, setVisiblePosts] = useState(6);

    const postsData = [
        {
            user: {
                username: "naufalandya",
                profileImage: "https://ik.imagekit.io/eoeykxtr4/1713965730492_awM58hGcN.png?updatedAt=1713965747854",
                location: "kamar"
            },
            post: {
                image: "https://ik.imagekit.io/eoeykxtr4/email.ejs%20-%20Ourair%20-%20Visual%20Studio%20Code%2022_05_2024%2015_01_57.png?updatedAt=1724947622963",
                likes: 100,
                comments: 50,
                caption: "ngoding",
                created_at : "29-08-2 4",
            }
        },
        {
            user: {
                username: "fauzanwiratama",
                profileImage: "https://ik.imagekit.io/eoeykxtr4/1639961843613.jpeg?updatedAt=1721151452172",
                location: "rumah verril"
            },
            post: {
                image: "https://ik.imagekit.io/eoeykxtr4/WhatsApp%20Image%202024-08-28%20at%2018.06.29_a9edc7f9.jpg?updatedAt=1724947140115",
                likes: 150,
                comments: 75,
                caption: "akhirnya selesai pe i",
                created_at : "19-02-24",
                location : "Indonesia"
            }
        },
    ];

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

    const renderPosts = postsData.slice(0, visiblePosts).map((postData, index) => (
        <div key={index} className="flex items-start p-3 pb-5 px-6 pl-5 shadow-md mt-4 yapping-post">
            {/* Foto Profil */}
            <img className="w-10 h-10 image-icon rounded-full" src={postData.user.profileImage} alt="Profile" />

            {/* Konten */}
            <div className="ml-4 w-full">
                {/* Username dan Caption */}
                <p className="text-lg font-semibold text-gray-200">{postData.user.username}</p>
                <p className="text-gray-300 text-sm mb-2">{postData.post.caption}</p>

                {/* Gambar Post */}
                <img 
                    className="w-full h-max object-cover mb-2 max-h-full cursor-pointer" 
                    src={postData.post.image} 
                    alt="Post" 
                    onClick={() => openPopup(postData.post.image)} 
                />

                {/* Reaksi */}
                <div className="reaction flex items-center text-gray-300 justify-between">
                    <div className="like-comment flex items-center text-gray-300 mt-5 gap-5">
                        <button className="flex items-center hover:text-red-500">
                            <BiLike className="like-icon" />
                            <span className="ml-1 like-content">{postData.post.likes}</span>
                        </button>
                        <button className="flex items-center hover:text-blue-500">
                            <GoComment className="comment-icon" />
                            <span className="ml-1 comment-content">{postData.post.comments}</span>
                        </button>
                    </div>
                    <div className='flex gap-5'>
                        <div className='flex items-center mt-5 '> 
                            <IoLocationOutline className='location-icon' />
                                <p className='date-content ml-1'>
                                    {postData.post.location ?? '-'}
                                </p>
                        </div>

                        <div className='flex items-center mt-5 '>📅 
                            <p className='date-content ml-1'>
                                {postData.post.created_at}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div>
            {renderPosts}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closePopup} // Close the popup when clicking outside the image
                >
                    <div className='popup-image-container'>
                        <div 
                            className="relative max-w-full mx-auto p-4 bg-transparent "
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <img 
                                src={selectedImage} 
                                alt="Popup" 
                                className="rounded-lg max-w-full max-image-popup object-contain" 
                            />
                            <button 
                                className="absolute top-7 right-10 text-white text-2xl" 
                                onClick={closePopup}
                            >
                                &times;
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default UserYapping;

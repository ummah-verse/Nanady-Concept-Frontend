import { useState, useEffect } from 'react';
import { BiLike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";

import './styles/MyMini.css';

const MyMini = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [visiblePosts, setVisiblePosts] = useState(6);

    const postsData = [
        {
            user: {
                username: "naufalandya",
                profileImage: "https://ik.imagekit.io/eoeykxtr4/1713965730492_awM58hGcN.png?updatedAt=1713965747854",
                location: "kamar"
            },
            post: {
                video: "https://ik.imagekit.io/eoeykxtr4/DSC_0174.MOV/ik-video.mp4?updatedAt=1725194322058",
                likes: 100,
                comments: 50,
                caption: "ngoding",
                created_at: "29-08-24",
            }
        },
        {
            user: {
                username: "fauzanwiratama",
                profileImage: "https://ik.imagekit.io/eoeykxtr4/1639961843613.jpeg?updatedAt=1721151452172",
                location: "rumah verril"
            },
            post: {
                video: "https://path.to/another/video.mp4",
                likes: 150,
                comments: 75,
                caption: "akhirnya selesai pe i",
                created_at: "19-02-24",
                location: "Indonesia"
            }
        },
    ];

    const openPopup = (video) => {
        setSelectedVideo(video);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setSelectedVideo('');
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
        <div key={index} className="flex items-start p-3 pb-5 px-6 pl-5 shadow-md mt-4 mini-post">
            {/* Foto Profil */}
            <img className="w-10 h-10 image-icon rounded-full" src={postData.user.profileImage} alt="Profile" />

            {/* Konten */}
            <div className="ml-4 flex flex-col w-full">
                {/* Username dan Caption */}
                <p className="text-lg font-semibold text-gray-200">{postData.user.username}</p>
                <p className="text-gray-300 text-sm mb-2">{postData.post.caption}</p>

                {/* Video Post */}
                <div className="relative flex">
                    <div className="video-container flex-1">
                        <video
                            className="video-player"
                            src={postData.post.video}
                            controls
                            onClick={() => openPopup(postData.post.video)}
                        />
                    </div>
                </div>

                {/* Lokasi dan Tanggal */}
                <div className='flex items-center justify-between text-gray-300 mt-4'>
                    <div className='flex items-center space-x-4'>
                        <button className="flex items-center hover:text-red-500">
                            <BiLike className="like-icon" />
                            <span className="ml-1 like-content">{postData.post.likes}</span>
                        </button>
                        <button className="flex items-center hover:text-blue-500">
                            <GoComment className="comment-icon" />
                            <span className="ml-1 comment-content">{postData.post.comments}</span>
                        </button>
                    </div>

                    <div className='flex items-center space-x-4'>
                        <p className='flex items-center'>
                            <IoLocationOutline className='location-icon' />
                            <span className='ml-1 date-content'>
                                {postData.post.location ?? '-'}
                            </span>
                        </p>

                        <p className='flex items-center'>
                            📅 <span className='ml-1 date-content'>
                                {postData.post.created_at}
                            </span>
                        </p>
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
                    onClick={closePopup}
                >
                    <div className="popup-video-container">
                        <div
                            className="relative max-w-full mx-auto p-4 bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={selectedVideo}
                                controls
                                className="rounded-lg max-w-full max-video-popup object-contain"
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

export default MyMini;

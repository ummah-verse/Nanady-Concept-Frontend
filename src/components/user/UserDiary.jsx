import { useState, useEffect, useRef } from 'react';
import { BiLike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import './styles/UserDiary.css';

const UserDiary = () => {
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [currentSlideIndex, setCurrentSlideIndex] = useState({}); // Track slide index for each post
    const [maxHeight, setMaxHeight] = useState(0);
    const firstSlideRef = useRef(null);

    const postsData = [
        {
            user: {
                username: "naufalandya",
                profileImage: "https://ik.imagekit.io/eoeykxtr4/1713965730492_awM58hGcN.png?updatedAt=1713965747854",
                location: "kamar"
            },
            post: {
                diary: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.., Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium....",
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
                diary: "Ini adalah teks lainnya yang sangat panjang...",
                likes: 150,
                comments: 75,
                caption: "akhirnya selesai pe i",
                created_at: "19-02-24",
            }
        },
    ];

    const splitTextIntoSlides = (text, maxLength) => {
        const slides = [];
        let currentSlide = '';

        text.split(' ').forEach(word => {
            if (currentSlide.length + word.length + 1 > maxLength) {
                if (currentSlide.length > 0) {
                    const remainingSpace = maxLength - currentSlide.length;
                    if (word.length > remainingSpace) {
                        currentSlide += word.slice(0, remainingSpace) + '-';
                        slides.push(currentSlide);
                        currentSlide = '-' + word.slice(remainingSpace) + ' ';
                    } else {
                        slides.push(currentSlide.trim());
                        currentSlide = word + ' ';
                    }
                }
            } else {
                currentSlide += word + ' ';
            }
        });

        if (currentSlide.length > 0) {
            slides.push(currentSlide.trim());
        }

        return slides;
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

    useEffect(() => {
        if (firstSlideRef.current) {
            setMaxHeight(firstSlideRef.current.clientHeight);
        }
    }, [firstSlideRef]);

    const handleNextSlide = (index) => {
        setCurrentSlideIndex(prevState => ({
            ...prevState,
            [index]: (prevState[index] || 0) + 1
        }));
    };

    const handlePrevSlide = (index) => {
        setCurrentSlideIndex(prevState => ({
            ...prevState,
            [index]: (prevState[index] || 0) - 1
        }));
    };

    const renderPosts = postsData.slice(0, visiblePosts).map((postData, index) => {
        const diarySlides = splitTextIntoSlides(postData.post.diary, 600);
        const currentSlide = currentSlideIndex[index] || 0;

        return (
            <div key={index} className="flex items-start p-3 pb-5 px-6 pl-5 shadow-md mt-4 diary-post">
                <img className="w-10 h-10 image-icon rounded-full" src={postData.user.profileImage} alt="Profile" />

                <div className="ml-4 flex flex-col w-full">
                    <p className="text-lg font-semibold text-gray-200">{postData.user.username}</p>
                    <p className="text-gray-300 text-sm mb-2">{postData.post.caption}</p>

                    <div className="relative flex flex-col space-y-4 diary-post-content">
                        <div
                            className="slide-content bg-neutral-800 p-3 rounded"
                            style={{ minHeight: `${maxHeight}px` }}
                            ref={index === 0 ? firstSlideRef : null}
                        >
                            <p className="text-gray-300 text-sm">{diarySlides[currentSlide]}</p>
                        </div>

                        <div className="flex justify-between mt-2">
                            <button 
                                className={`text-white bg-gray-600 p-2 rounded ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                onClick={() => handlePrevSlide(index)}
                                disabled={currentSlide === 0}
                            >
                                <FaChevronLeft />
                            </button>
                            <button 
                                className={`text-white bg-gray-600 p-2 rounded ${currentSlide === diarySlides.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                onClick={() => handleNextSlide(index)}
                                disabled={currentSlide === diarySlides.length - 1}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className="reactions flex gap-4 mt-4">
                        <button className="flex items-center hover:text-red-500">
                            <BiLike className="like-icon" />
                            <span className="ml-1 like-content">{postData.post.likes}</span>
                        </button>
                        <button className="flex items-center hover:text-blue-500">
                            <GoComment className="comment-icon" />
                            <span className="ml-1 comment-content">{postData.post.comments}</span>
                        </button>
                    </div>

                    <div className='flex gap-5 mt-5'>
                        <p className='flex items-center'>
                            <IoLocationOutline className='location-icon' />
                            <span className='date-content ml-1'>
                                {postData.user.location ?? '-'}
                            </span>
                        </p>

                        <p className='flex items-center'>
                            📅 <span className='date-content ml-1'>
                                {postData.post.created_at}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            {renderPosts}
        </div>
    );
};

export default UserDiary;

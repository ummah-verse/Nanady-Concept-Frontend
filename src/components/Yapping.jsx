// components/Yapping.js

import { FaHeart, FaComment } from 'react-icons/fa';
import './styles/Yapping.css'

const Yapping = () => {
    const postData = {
        user: {
            username: "Username",
            profileImage: "https://via.placeholder.com/48",
            location: "Location"
        },
        post: {
            image: "https://via.placeholder.com/640x640",
            likes: 100,
            caption: "This is a caption for the post. It describes the content of the image."
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200">
                <img className="w-12 h-12 rounded-full" src={postData.user.profileImage} alt="Profile" />
                <div className="ml-4">
                    <p className="text-lg font-semibold">{postData.user.username}</p>
                    <p className="text-gray-500 text-sm">{postData.user.location}</p>
                </div>
            </div>

            {/* Image */}
            <img className="w-full h-64 object-cover" src={postData.post.image} alt="Post" />

            {/* Actions */}
            <div className="p-4">
                <div className="flex items-center mb-2">
                    <button className="text-gray-600 hover:text-red-500">
                        <FaHeart className="w-6 h-6" />
                    </button>
                    <button className="ml-4 text-gray-600 hover:text-blue-500">
                        <FaComment className="w-6 h-6" />
                    </button>
                </div>
                <p className="text-gray-700">{postData.post.likes} likes</p>
                <p className="text-gray-700 mt-2">{postData.post.caption}</p>
            </div>
        </div>
    );
};

export default Yapping;

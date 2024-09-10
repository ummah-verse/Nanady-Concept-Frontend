import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiLike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import './styles/YappingDetail.css';

const YappingDetail = () => {
    const { postId } = useParams(); // Assuming you are passing postId as a URL parameter
    const [postDetails, setPostDetails] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Fetch the post details using postId
        const fetchPostDetails = async () => {
            // Replace with your API call
            const post = {
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
                    created_at: "29-08-24",
                }
            };
            setPostDetails(post);
        };

        // Fetch comments related to the post
        const fetchComments = async () => {
            // Replace with your API call
            const commentsData = [
                { id: 1, username: 'user1', text: 'Great post!' },
                { id: 2, username: 'user2', text: 'Nice work!' },
            ];
            setComments(commentsData);
        };

        fetchPostDetails();
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        // Add the new comment to the comments array
        setComments([...comments, { id: comments.length + 1, username: 'currentUser', text: newComment }]);
        setNewComment('');
    };

    if (!postDetails) {
        return <p></p>;
    }

    return (
        <div className="yapping-detail-container">
            <div className="flex items-start p-3 pb-5 px-6 pl-5 pt-4 yapping-detail-container-content">
                <img className="w-10 h-10 rounded-full image-icon" src={postDetails.user.profileImage} alt="Profile" />

                <div className="ml-4 w-full">
                    <p className="text-lg font-semibold text-gray-200">{postDetails.user.username}</p>
                    <p className="text-gray-300 text-sm mb-2">{postDetails.post.caption}</p>

                    <img 
                        className="w-full h-max object-cover mb-2 max-h-full" 
                        src={postDetails.post.image} 
                        alt="Post" 
                    />

                    <div className="reaction flex items-center text-gray-300 justify-between">
                        <div className="like-comment flex items-center text-gray-300 mt-5 gap-5">
                            <button className="flex items-center hover:text-red-500">
                                <BiLike className="like-icon" />
                                <span className="ml-1 like-content">{postDetails.post.likes}</span>
                            </button>
                            <button className="flex items-center hover:text-blue-500">
                                <GoComment className="comment-icon" />
                                <span className="ml-1 comment-content">{postDetails.post.comments}</span>
                            </button>
                        </div>
                        <div className='flex gap-5'>
                            <div className='flex items-center mt-5'>
                                <IoLocationOutline className='location-icon' />
                                <p className='date-content ml-1'>
                                    {postDetails.post.location ?? '-'}
                                </p>
                            </div>
                            <div className='flex items-center mt-5'>📅 
                                <p className='date-content ml-1'>
                                    {postDetails.post.created_at}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="comments-section mt-2 p-3 pb-5 px-6 pl-5 pt-4">
                <h2 className="font-semibold text-gray-200 mb-4">Comments</h2>
                {comments.map(comment => (
                    <div key={comment.id} className="comment-item mb-4">
                        <p className="text-gray-200">
                            <span style={ { fontSize : '14px'}} className="font-semibold">{comment.username}: </span>
                            <p style={ { fontSize : '14px'}}>
                                {comment.text}
                            </p>
                            
                        </p>
                    </div>
                ))}

                <form onSubmit={handleCommentSubmit} className="comment-form mt-6">
                    <textarea
                        className="w-full p-3 text-sm bg-gray-800 text-white rounded-md"
                        rows="4"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button type="submit" className="mt-3 p-2 bg-blue-600 rounded-md text-white hover:bg-blue-700">
                        Submit Comment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default YappingDetail;

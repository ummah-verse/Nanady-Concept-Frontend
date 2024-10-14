import { useState, useEffect } from 'react';
import './styles/Reminder.css';

const Reminder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [remindersData, setRemindersData] = useState([]);

    // Fetch reminders data from API
    useEffect(() => {
        const fetchReminders = async () => {

            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/my-reminder`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                if (result.status) {
                    setRemindersData(result.data); // Set API data to state
                } else {
                    console.error('Error fetching reminders:', result.message);
                }
            } catch (error) {
                console.error('Error fetching reminders:', error);
            }
        };

        fetchReminders();
    }, []); // Empty dependency array ensures this runs once on mount

    // Group data by created_date
    const groupedData = remindersData.reduce((groups, reminderData) => {
        const createdDate = reminderData.created_date ? new Date(reminderData.created_date) : null;
        const date = createdDate && !isNaN(createdDate.getTime())
            ? createdDate.toISOString().split('T')[0]
            : 'Unknown Date';

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(reminderData);
        return groups;
    }, {});

    const closePopup = () => {
        setIsOpen(false);
        setSelectedImage('');
    };

    // Handle infinite scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
                setVisiblePosts(prevVisiblePosts => Math.min(prevVisiblePosts + 6, remindersData.length));
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [remindersData.length]);

    // Render posts grouped by date
    const renderPosts = Object.keys(groupedData).map((date, index) => (
        <div key={index}>
            <h2 className="text-xl font-bold text-gray-300 p-4">{date}</h2>

            {groupedData[date].slice(0, visiblePosts).map((reminderData, idx) => (
                <div key={reminderData.id} className="p-3 pb-5 px-6 pl-5 shadow-md reminder-post pt-0">
                    {idx === 0 && (
                        <div className="flex items-start">
                            <img
                                className="w-10 h-10 image-icon rounded-full"
                                src={reminderData.users?.avatar_link || `/public/wakwaw.png`}
                                alt="Profile"
                            />
                            <div className="ml-4">
                                <p className="text-lg font-semibold text-gray-200">{reminderData.users?.username || 'Unknown User'}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-300 mb-2">{reminderData.title || 'No Title'}</p>
                        <p className="text-gray-300 text-sm mb-2">{reminderData.content || 'No Content Available'}</p>

                        <div className="reaction flex items-center text-gray-300 justify-between">
                            <div className='flex items-center'>
                                <p style={{ fontSize: '1rem', marginTop: '1px' }}>Status</p>
                                <p className='pl-2'>:</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '3px' }} className='ml-3'>
                                    {reminderData.is_finished ? '✅ Finished' : '❌ Not Finished'}
                                </p>
                            </div>
                            <div className='flex gap-5'>
                                <div className='flex items-center'>
                                    📅
                                    <p className='date-content ml-1'>
                                        {reminderData.deadline_date ? new Date(reminderData.deadline_date).toLocaleDateString() : 'Date Unknown'}
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    ⏰
                                    <p className='date-content ml-1'>
                                        {reminderData.deadline_date
                                            ? `${new Date(reminderData.deadline_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                                            : 'Time Unknown'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ));

    return (
        <div className="reminder-container">
            {/* Render posts */}
            {renderPosts}

            {/* Modal for displaying the selected image */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closePopup}
                >
                    <div className="relative max-w-full max-h-full">
                        <img
                            className="max-w-full max-h-full rounded-md"
                            src={selectedImage}
                            alt="Selected"
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-lg focus:outline-none"
                            onClick={closePopup}
                        >
                            &times; {/* Close button */}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reminder;

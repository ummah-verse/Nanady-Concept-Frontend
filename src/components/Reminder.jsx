import { useState, useEffect } from 'react';
import './styles/Reminder.css';

const Reminder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [visiblePosts, setVisiblePosts] = useState(6);

    const remindersData = [
        {
            user: {
                username: "naufalandya",
                profileImage: "https://ik.imagekit.io/eoeykxtr4/1713965730492_awM58hGcN.png?updatedAt=1713965747854",
                location: "kamar"
            },
            reminder: {
                content: "Meeting dengan tim",
                is_finished: false,
                started_date: new Date('2024-05-03T08:00:00Z'),
                finished_date: new Date('2024-09-03T10:00:00Z'),
                deadline_date: new Date('2024-09-03T12:00:00Z'),
                created_date: new Date('2024-09-01T07:00:00Z'),
            }
        },
        {
            user: {
                username: "fauzanwiratama",
                profileImage: "https://ik.imagekit.io/eoeykxtr4/1639961843613.jpeg?updatedAt=1721151452172",
                location: "rumah verril"
            },
            reminder: {
                content: "Review project",
                description : "Bla bla bla bla",
                is_finished: true,
                started_date: new Date('2024-09-02T08:00:00Z'),
                finished_date: new Date('2024-09-02T09:00:00Z'),
                deadline_date: new Date('2024-09-02T12:00:00Z'),
                created_date: new Date('2024-08-30T07:00:00Z'),
            }
        },

        {
            user: {
                username: "fauzanwiratama",
                profileImage: "https://ik.imagekit.io/eoeykxtr4/1639961843613.jpeg?updatedAt=1721151452172",
                location: "rumah verril"
            },
            reminder: {
                content: "Review project",
                description : "Bla bla bla bla",
                is_finished: true,
                started_date: new Date('2024-09-02T08:00:00Z'),
                finished_date: new Date('2024-09-02T09:00:00Z'),
                deadline_date: new Date('2024-09-02T12:00:00Z'),
                created_date: new Date('2024-08-30T07:00:00Z'),
            }
        },

    ];

    // Mengelompokkan data berdasarkan tanggal pembuatan (created_date)
    const groupedData = remindersData.reduce((groups, reminderData) => {
        const date = reminderData.reminder.created_date.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
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

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
                setVisiblePosts(prevVisiblePosts => Math.min(prevVisiblePosts + 6, remindersData.length));
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [remindersData.length]);

    const renderPosts = Object.keys(groupedData).map((date, index) => (
        <div key={index}>
            {/* Menampilkan tanggal pembuatan sebagai judul harian */}
            <h2 className="text-xl font-bold text-gray-300 p-4">{date}</h2>

            {groupedData[date].slice(0, visiblePosts).map((reminderData, idx) => (
                <div key={idx} className="p-3 pb-5 px-6 pl-5 shadow-md reminder-post pt-0">
                    {/* Menampilkan informasi umum hanya sekali per hari */}
                    {idx === 0 && (
                        <div className="flex items-start">
                            {/* Foto Profil */}
                            <img className="w-10 h-10 image-icon rounded-full" src={reminderData.user.profileImage} alt="Profile" />
                            <div className="ml-4">
                                <p className="text-lg font-semibold text-gray-200">{reminderData.user.username}</p>
                                <p className="text-gray-300 text-sm">{reminderData.user.location}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-4">
                        {/* Konten dan deskripsi pengingat */}
                        <p className="text-gray-300 text-sm mb-2">{reminderData.reminder.content}</p>
                        <p className="text-gray-300 text-sm mb-4">{reminderData.reminder.description ? reminderData.reminder.description : "-"}</p>

                        {/* Status, tanggal mulai, dan tenggat waktu */}
                        <div className="reaction flex items-center text-gray-300 justify-between">
                            <div className='flex items-center'>
                                <p style={{ fontSize: '1rem', marginTop: '1px' }}>Status</p>
                                <p className='pl-2'>:</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '3px' }} className='ml-3'>{reminderData.reminder.is_finished ? '✅' : '❌'}</p>
                            </div>
                            <div className='flex gap-5'>
                                <div className='flex items-center'>📅
                                    <p className='date-content ml-1'>{reminderData.reminder.started_date.toISOString().split('T')[0]}</p>
                                </div>
                                <div className='flex items-center'>⏰
                                    <p className='date-content ml-1'>{reminderData.reminder.started_date.toISOString().split('T')[1].slice(0, 5)} - {reminderData.reminder.finished_date.toISOString().split('T')[1].slice(0, 5)}</p>
                                </div>
                                <div className='flex items-center'>⌛
                                    <p className='date-content ml-1'>{reminderData.reminder.deadline_date.toISOString().split('T')[1].slice(0, 5)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
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

export default Reminder;

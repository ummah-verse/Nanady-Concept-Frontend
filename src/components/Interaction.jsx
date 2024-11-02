import { useEffect, useState } from 'react';
import io from 'socket.io-client';  
import './styles/Interaction.css';
import { NavLink } from 'react-router-dom';

const socket = io(`${import.meta.env.VITE_API_URL_SOCKET}`, {
  transports: ['websocket'], 
  secure: true,
});

const formatDate = (dateString) => {


    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 172800) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString(); 
    }
};

const Interaction = () => {
    const darkMode = localStorage.getItem('theme') || 'light'

    const [interactions, setInteractions] = useState([]);
    

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await fetch(`https://ourair.my.id/api/notifications`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (data.status) {
                    const notifications = data.data.map(notification => ({
                        username: notification.byusers.username,
                        profileImage: notification.byusers.avatar_link || `https://ik.imagekit.io/eoeykxtr4/wakwaw.png?updatedAt=1729922813457`, 
                        action: notification.detail,
                        created_at: notification.created_at,
                        isRead: false, 
                        redirect: notification.redirect,
                    }));
                    setInteractions(notifications);
                }
            } catch (error) {
                console.error('Failed to fetch notifications', error);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('id'); 

        socket.on(`user-${userId}`, (notification) => {
            setInteractions(prevInteractions => [
                {
                    username: notification.username || 'Unknown',
                    profileImage: notification.avatar_link,
                    created_at: notification.created_at,
                    action: notification.message,
                    isRead: false,
                    redirect: notification.redirect,
                },
                ...prevInteractions,
            ]);
        });

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        return () => {
            socket.off(`user-${userId}`);
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <div className="text-white">
            {interactions.map((interaction, index) => (

                <div
                    key={index}
                    className={`notification-row flex items-center justify-between ${
                        interaction.isRead
                          ? `${darkMode === 'dark' ? 'notification-read-dark' : 'notification-read-light hover:notification-row-light'}`
                          : `${darkMode === 'dark' ? 'notification-is-not-read-dark' : 'notification-is-not-read-light hover:bg-[#e0e0e0]'}`
                      }`}
                      
                >

                    <NavLink to={`/yapping/${interaction.redirect}`} className={`flex items-center justify-between w-full P-2`}>
                    <div className='flex items-center p-3'>
                        <img
                            className="w-10 h-10 rounded-full"
                            src={interaction.profileImage}
                            alt={`${interaction.username} profile`}
                        />
                        <p className="ml-4 text-gray-200">
                            <span className={`font-semibold ${darkMode === 'dark' ? 'text-white' : 'text-black'}`}>{interaction.username} &nbsp;</span>
                            <span className={`font-semibold ${darkMode === 'dark' ? 'text-white' : 'text-neutral-600'}`}>
                            {interaction.action}
                            </span> 
                        </p>
                    </div>

                    <div className='flex justify-end text-right'>
                        <p className="ml-4 text-gray-200">
                            <span className={`font-semibold pr-2 ${darkMode === 'dark' ? 'text-white' : 'text-neutral-600'}`}>{formatDate(interaction.created_at)}</span> 
                        </p>
                    </div>
                    </NavLink>

                </div>
            ))}
        </div>
    );
}

export default Interaction;

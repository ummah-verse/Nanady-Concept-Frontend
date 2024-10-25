import { useEffect, useState } from 'react';
import '../sidefeature.css'


const TodayTimer = () => {
    const [duration, setDuration] = useState(0);
    const [summary, setSummary] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    useEffect(() => {
        const fetchUsageData = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/usage/today`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Use token in Authorization header
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch usage data');
                }

                const data = await response.json();
                setDuration(data.duration); // Set initial duration
                setSummary(data.summary)
                setIsFetching(false); // Data has been fetched
            } catch (error) {
                console.error(error);
                setIsFetching(false);
            }
        };

        fetchUsageData();

        const interval = setInterval(() => {
            setDuration((prevDuration) => prevDuration + 1);
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
                {isFetching ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {/* <h1 className='mb-1'>Activity</h1> */}
                        <p style={ { fontSize : '14px'}}>{summary}</p>
                        <p style={ { fontSize : '14px'}} className='mt-2'>Time Wasted: {formatDuration(duration)}</p>
                    </div>

                )}
            </div>

    );
};

export default TodayTimer;

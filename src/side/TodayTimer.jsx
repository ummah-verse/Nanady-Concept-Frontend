import { useEffect, useState } from 'react';
import '../sidefeature.css';

const TodayTimer = () => {
    const [duration, setDuration] = useState(0);
    const [summary, setSummary] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const [showAlert, setShowAlert] = useState(false); // New state for controlling alert visibility
    const darkMode = localStorage.getItem('theme') || 'light';

    useEffect(() => {
        const fetchUsageData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/usage/today`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch usage data');
                }

                const data = await response.json();
                setDuration(data.duration);
                setSummary(data.summary);
                setIsFetching(false);
            } catch (error) {
                console.error(error);
                setIsFetching(false);
            }
        };

        fetchUsageData();

        const interval = setInterval(() => {
            setDuration((prevDuration) => {
                const newDuration = prevDuration + 1;
                
                // Trigger alert if duration exceeds 2 hours (7200 seconds)
                if (newDuration >= 7200 && !showAlert) {
                    setShowAlert(true);
                }
                
                return newDuration;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [showAlert]);

    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`mt-2 flex flex-col items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p style={{ fontSize: '14px' }}>{summary}</p>
                    <p style={{ fontSize: '14px' }} className="mt-2">Time Wasted: {formatDuration(duration)}</p>
                </div>
            )}

            {/* Display Alert */}
            {showAlert && (
                <div className="mt-4 p-3 border border-yellow-400 bg-yellow-100 rounded-md text-yellow-900 relative">
                    <p>
                        Today, you’ve been using this application for over 2 hours. 
                        Consider taking a break or engaging in another productive activity.
                    </p>
                    {/* <button
                        onClick={() => setShowAlert(false)}
                        className="absolute top-1 right-1 text-gray-800 font-bold hover:text-gray-600"
                    >
                        ✕
                    </button> */}
                </div>
            )}
        </div>
    );
};

export default TodayTimer;

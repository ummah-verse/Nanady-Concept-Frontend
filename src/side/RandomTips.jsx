import { useEffect, useState } from 'react';
import '../sidefeature.css';

const RandomTips = () => {
    const [tip, setTip] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const darkMode = localStorage.getItem('theme') || 'light';

    useEffect(() => {
        const fetchRandomTip = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/tips/random`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch random tip');
                }

                const data = await response.json();
                setTip(data.tips); // Set the tip directly from the response
                setIsFetching(false);
            } catch (error) {
                console.error(error);
                setIsFetching(false);
            }
        };

        fetchRandomTip();
    }, []);

    return (
        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p style={{ fontSize: '14px' }}>{tip}</p>
                </div>
            )}
        </div>
    );
};

export default RandomTips;

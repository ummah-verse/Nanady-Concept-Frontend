import { useEffect, useState } from 'react';
import '../sidefeature.css';

const RandomFact = () => {
    const [fact, setFact] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const darkMode = localStorage.getItem('theme') || 'light';

    useEffect(() => {
        const fetchRandomFact = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/fact`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch random fact');
                }

                const data = await response.json();
                setFact(data.fact); // Set the fact directly from the response
                setIsFetching(false);
            } catch (error) {
                console.error(error);
                setIsFetching(false);
            }
        };

        fetchRandomFact();
    }, []);

    return (
        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p style={{ fontSize: '14px' }}>{fact}</p>
                    {/* Optionally, you can display a placeholder for the author or other details if needed */}
                </div>
            )}
        </div>
    );
};

export default RandomFact;

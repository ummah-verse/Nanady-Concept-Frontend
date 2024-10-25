import { useEffect, useState } from 'react';
import '../sidefeature.css';

const Motivation = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const darkMode = localStorage.getItem('theme') || 'light';

    useEffect(() => {
        const fetchMotivationQuote = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}/motivation`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch motivation quote');
                }

                const data = await response.json();
                setQuote(data.quote);
                setAuthor(data.author);
                setIsFetching(false);
            } catch (error) {
                console.error(error);
                setIsFetching(false);
            }
        };

        fetchMotivationQuote();
    }, []);

    return (
        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p style={{ fontSize: '14px' }}>{quote}</p>
                    <p style={{ fontSize: '14px' }}>- {author === 'Unknown' ? 'Alobro Team' : `${author}`}</p>
                </div>
            )}
        </div>
    );
};

export default Motivation;

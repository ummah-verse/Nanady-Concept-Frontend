import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// Define Article interface for the API response
const NewsComponent = () => {

    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/news`, { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Use the token in Authorization header
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Error fetching news: ${response.statusText}`);
                }

                const data = await response.json();

                // Filter out articles with missing or removed data
                const filteredArticles = data.articles.filter((article) => article.title && !article.title.toLowerCase().includes("removed"));
                // console.log(filteredArticles.map( (lol)=> {
                //     console.log(lol)
                // }))
                setArticles(filteredArticles);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p className="text-center text-gray-500"></p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            <div className="flex flex-col gap-4 w-full">
                {articles.map((article) => (
                    <div key={article.url} className={`shadow-md w-full overflow-hidden ${darkMode === "dark" ? 'text-white bg-neutral-900' : 'bg-neutral-100 text-black'}`}>
                        {article.urlToImage ? (
                            <img 
                                src={article.urlToImage} 
                                alt={article.title || 'No title available'} 
                                className="w-full h-48 object-cover" 
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}

                        <div className="w-full p-4">
                            <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                            <p className={`mb-2 ${darkMode === "dark" ? ' text-gray-200 bg-neutral-900' : 'bg-neutral-100 text-black'}`}>{article.description || 'No description available'}</p>
                            <a 
                                href={article.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:underline"
                            >
                                Read more
                            </a>
                            <p className="text-sm text-gray-500 mt-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default NewsComponent;
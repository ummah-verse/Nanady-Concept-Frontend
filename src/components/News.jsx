import { useEffect, useState } from 'react';

const API_KEY = '287d64adade74b9b832258f2e7af85cd'; // Your News API key
const query = 'climate starvation conflict'; // Your search query

const NewsComponent = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`);
                
                if (!response.ok) {
                    throw new Error(`Error fetching news: ${response.statusText}`);
                }

                const data = await response.json();
                // Filter out articles without valid titles or removed articles
                const filteredArticles = data.articles.filter(article => article.title && !article.title.toLowerCase().includes("removed"));
                setArticles(filteredArticles);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            {/* <h2 className="text-2xl font-bold mb-4">News on Climate Starvation Conflict</h2> */}
            <div className="flex flex-col gap-4">
                {articles.map((article) => (
                    <div key={article.url} className="bg-neutral-900 shadow-md overflow-hidden">
                        {article.urlToImage && (
                            <img 
                                src={article.urlToImage} 
                                alt={article.title} 
                                className="w-full h-48 object-cover" 
                            />
                        )}
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                            <p className="text-gray-200 mb-2">{article.description || 'No description available'}</p>
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

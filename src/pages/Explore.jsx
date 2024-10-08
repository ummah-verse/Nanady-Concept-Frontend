import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Explore.css';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async (query) => {
    setLoading(true);
    setError('');

    // Retrieve the Bearer token from localStorage
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/search-users`, {
        params: {
          username: query
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Ensure data structure exists before setting results
      const fetchedData = response?.data?.data || [];
      setResults(fetchedData);  // Always set results to an array
    } catch (err) {
      setError('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const debounceFetch = setTimeout(() => {
        fetchUsers(searchTerm);
      }, 500); // Add a 500ms delay to avoid too many requests

      return () => clearTimeout(debounceFetch);
    } else {
      setResults([]);  // Clear results if search term is empty
    }
  }, [searchTerm]);

  return (
    <div className="text-white bg-neutral-900 content-container p-4">
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          className="bg-neutral-800 p-3 w-full text-white focus:ring-0 search-bar"
          placeholder="Search for a user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="search-results mt-4 search-result">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && results.length > 0 ? (
          results.map(user => (
            <div key={user.username} className="flex items-center p-4 hover:bg-neutral-800 hover:cursor-pointer transition-colors duration-300 ease-in-out">
              <img 
                src={user.avatar_link || 'https://via.placeholder.com/150'} 
                alt={user.username} 
                className="w-10 h-10 rounded-full mr-4" 
              />
              <span className="text-white">{user.username}</span>
            </div>
          ))
        ) : (
          searchTerm && !loading && <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Explore;

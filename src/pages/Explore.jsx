import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Explore.css';
import { Link } from 'react-router-dom';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage


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
        // <div className={`content-container p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] border-neutral-950 text-gray-900 font-semibold shadow-xl border-4 mb-2'}`}>

    <div className={`content-container p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          className={` p-3 w-full focus:ring-0 search-bar ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}
          // className="bg-neutral-800 p-3 w-full text-white focus:ring-0 search-bar"
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
          <Link 
            to={`/${user.username}`} // Navigate to the user's profile page
            key={user.username} 
            className={`flex items-center hover:cursor-pointer transition-colors p-4 duration-300 ease-in-out ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300 hover:bg-neutral-800 ' : 'bg-[#f5f5f5c5] hover:bg-neutral-300 border-neutral-950 text-gray-900 font-semibold mb-2'}`}
          >
            <img 
              src={user.avatar_link || 'https://via.placeholder.com/150'} 
              alt={user.username} 
              className="w-10 h-10 rounded-full mr-4" 
            />
            <span className={` ${darkMode === "dark" ? ' text-gray-300 hover:bg-neutral-800 ' : ' border-neutral-950 text-gray-900 font-semibold mb-2'}`}
            >{user.username}</span>
          </Link>
        ))
      ) : (
        searchTerm && !loading && <p className="text-center text-gray-500">No users found</p>
      )}
      </div>
    </div>
  );
};

export default Explore;

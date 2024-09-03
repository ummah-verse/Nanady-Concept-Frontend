import { useState } from 'react';
import './styles/Explore.css'

const users = [
  { id: 1, username: 'naufalandya', profileImage: 'https://example.com/profile1.jpg' },
  { id: 2, username: 'fauzanwiratama', profileImage: 'https://example.com/profile2.jpg' },
  { id: 3, username: 'verrillia', profileImage: 'https://example.com/profile3.jpg' },
  { id: 4, username: 'ahmadsyafiq', profileImage: 'https://example.com/profile4.jpg' },
  { id: 5, username: 'raniayuni', profileImage: 'https://example.com/profile5.jpg' },
  { id: 6, username: 'adityamulia', profileImage: 'https://example.com/profile6.jpg' },
  { id: 7, username: 'sitiwardani', profileImage: 'https://example.com/profile7.jpg' },
  { id: 8, username: 'imamfathoni', profileImage: 'https://example.com/profile8.jpg' },
  { id: 9, username: 'rizkyhamzah', profileImage: 'https://example.com/profile9.jpg' },
  { id: 10, username: 'yolandaindra', profileImage: 'https://example.com/profile10.jpg' }
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== '') {
      const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredUsers);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="text-white bg-neutral-900 content-container p-4">
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          className="bg-neutral-800 p-3 w-full text-white focus:ring-0 search-bar"
          placeholder="Search for a user..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="search-results mt-4 search-result">
        {results.length > 0 ? (
          results.map(user => (
            <div key={user.id} className="flex items-center p-4 hover:bg-neutral-800 hover:cursor-pointer transition-colors duration-300 ease-in-out">
              <img src={user.profileImage} alt={user.username} className="w-10 h-10 rounded-full mr-4" />
              <span className="text-white">{user.username}</span>
            </div>
          ))
        ) : (
          searchTerm && <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Explore;

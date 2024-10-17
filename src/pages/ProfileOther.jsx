import { useState, useEffect } from 'react';
import { Toast } from 'flowbite-react';
import PropTypes from 'prop-types'; // Import PropTypes
// import './styles/ProfileCard.css';

const ProfileOther = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch the profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        const result = await response.json();
        if (result.status) {
          setProfileData(result.data);
        } else {
          Toast.error(result.message || 'Failed to fetch profile data.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        Toast.error('Terjadi kesalahan saat mengambil data profil. Silakan coba lagi.');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProfile();
  }, [username]);

  // If loading, render the skeleton
  if (loading) {
    return (
      <div className="w-full rounded overflow-hidden shadow-lg bg-white profile-card p-6 flex flex-col relative">
        {/* Loading skeleton can be added here */}
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  const { name, bio, created_at, avatar_link } = profileData;

  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white profile-card p-6 flex flex-col relative">
      <div className="flex items-center">
        <img
          className="w-24 h-24 rounded-full photo-profile"
          src={avatar_link || `/public/wakwaw.png`}
          alt="Profile"
        />
        <div className="ml-6 flex-grow">
          <h2 className="name text-xl font-bold text-gray-300 dark:text-white">{name}</h2>
          <p className="bio mt-5 text-gray-300 dark:text-gray-300">{bio || "No bio available"}</p>
          <p className="joined-on text-sm flex items-center text-gray-300 dark:text-gray-400">
            Joined on {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
ProfileOther.propTypes = {
  username: PropTypes.string.isRequired, // username should be a required string
};

export default ProfileOther;

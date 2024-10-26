import { useState, useEffect } from 'react';
import { Toast } from 'flowbite-react';
import PropTypes from 'prop-types'; // Import PropTypes
// import './styles/ProfileCard.css';

const ProfileOther = ({ username }) => {
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  // const containerClass = darkMode === 'dark' ? 'bg-neutral-900 text-white' : 'text-white bg-[#abffe355] text-black border-neutral-950 border-4 shadow-xl';
  const textLight = darkMode === 'dark' ? 'text-gray-300' : 'text-gray-900 font-semibold';

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
    // <div className={`w-full rounded overflow-hidden shadow-lg profile-card p-6 flex-col relative ${containerClass}`}>
    <div className={`w-full rounded overflow-hidden profile-card p-6 flex-col relative ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-0'}`}>

      <div className="flex items-center">
        <img
          className="w-24 h-24 rounded-full photo-profile"
          src={avatar_link || `https://ik.imagekit.io/eoeykxtr4/wakwaw.png?updatedAt=1729922813457`}
          alt="Profile"
        />
        <div className="ml-6 flex-grow">
           <div className='flex items-center gap-3'>
              <h2 className={`name text-xl font-bold ${textLight}`}>
                {name}
              </h2>
              <p className={`username ${textLight}`}>@{username}</p>
            </div>
          <p className={`bio mt-5 ${textLight}`}>{bio || "No bio available"}</p>
          <p className={`joined-on text-sm flex items-center ${textLight}`}>
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

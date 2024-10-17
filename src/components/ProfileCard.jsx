import { useState, useEffect } from 'react';
import { SlOptions } from "react-icons/sl";
import { NavLink, useNavigate } from 'react-router-dom';
import { Toast } from 'flowbite-react';
import { MdOutlineEdit } from "react-icons/md";
import './styles/ProfileCard.css';

const ProfileCard = () => {
  const [profileData, setProfileData] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // If loading, render the skeleton
  if (loading) {
    return (
      <div className="w-full rounded overflow-hidden shadow-lg bg-white profile-card p-6 flex flex-col relative">
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  const { name, username, bio, created_at, avatar_link } = profileData;

  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white profile-card p-6 flex flex-col relative">
      <div className="flex items-center">
        <div className="relative">
          <img
            className="w-24 h-24 rounded-full photo-profile"
            src={avatar_link || `/public/wakwaw.png`}
            alt="Profile"
          />
          <NavLink
            to="/profile/avatar/edit"
            className="custom-edit-avatar-button"
            title="Edit Avatar"
          >
            <MdOutlineEdit className="w-5 h-5" />
          </NavLink>
        </div>
        <div className="ml-6 flex-grow">
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <h2 className="name text-xl font-bold text-gray-300 dark:text-white">
                {name}
              </h2>
              <p className="username text-gray-300 dark:text-gray-400">@{username}</p>
            </div>
            <div className="relative">
              <SlOptions
                className='text-black dark:text-white option cursor-pointer'
                onClick={toggleMenu}
              />
              {menuVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="bio mt-5 text-gray-300 dark:text-gray-300">{bio || "No bio available"}</p>
          <div className="menu-card mt-6 flex justify-between">
            <p className="joined-on text-sm flex items-center text-gray-300 dark:text-gray-400">
              Joined on {new Date(created_at).toLocaleDateString()}
            </p>
            <div className="menu-buttons gap-3 flex justify-between">
              <button>
                <NavLink
                  to="/profile/edit"
                  className={({ isActive }) =>
                    `p-3 menu-profile transition-colors duration-300 ease-in-out ${isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'} w-full text-center`
                  }
                >
                  Edit Profile
                </NavLink>
              </button>
              <button>
                <NavLink
                  to="/upload"
                  className={({ isActive }) =>
                    `p-3 menu-profile transition-colors duration-300 ease-in-out ${isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'} w-full text-center`
                  }
                >
                  Create Post
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;




// import { useState, useEffect } from 'react';
// import { SlOptions } from "react-icons/sl";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Toast } from 'flowbite-react'; // Import Toast component from Flowbite
// import './styles/ProfileCard.css';

// const ProfileCard = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   // Fetch the profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         const result = await response.json();
//         if (result.status) {
//           setProfileData(result.data);
//         } else {
//           // Show error notification if status is false
//           Toast.error(result.message || 'Failed to fetch profile data.');
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         // Show error notification for catch block
//         Toast.error('Terjadi kesalahan saat mengambil data profil. Silakan coba lagi.');
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Function to handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove token from localStorage
//     navigate('/login'); // Redirect to login page
//   };

//   if (!profileData) {
//     return <div></div>;
//   }

//   const { name, username, bio, created_at, avatar_link } = profileData;

//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg bg-white profile-card p-6 flex flex-col relative">
//       <div className="flex items-center">
//         <img
//           className="w-24 h-24 rounded-full photo-profile"
//           src={avatar_link || "https://via.placeholder.com/150"}
//           alt="Profile"
//         />
//         <div className="ml-6 flex-grow">
//           <div className='flex items-center justify-between gap-3'>
//             <div className='flex items-center gap-3'>
//               <h2 className="name text-xl font-bold text-gray-300 dark:text-white">
//                 {name}
//               </h2>
//               <p className="username text-gray-300 dark:text-gray-400">@{username}</p>
//             </div>
//             <div className="relative">
//               <SlOptions
//                 className='text-black dark:text-white option cursor-pointer'
//                 onClick={toggleMenu}
//               />
//               {menuVisible && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-1 z-50">
//                   <button
//                     onClick={handleLogout}
//                     className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 w-full text-left"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <p className="bio mt-5 text-gray-300 dark:text-gray-300">{bio || "No bio available"}</p>

//           <div>
//             <div className="menu-card mt-6 flex justify-between">
//               <p className="joined-on text-sm flex items-center text-gray-300 dark:text-gray-400">
//                 Joined on {new Date(created_at).toLocaleDateString()}
//               </p>

//               <div className="menu-buttons gap-3 flex justify-between">
//                 <button>
//                   <NavLink
//                     to="/profile/edit"
//                     className={({ isActive }) =>
//                       `p-3 menu-profile transition-colors duration-300 ease-in-out ${
//                         isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'
//                       } w-full text-center`
//                     }
//                   >
//                     Edit Profile
//                   </NavLink>
//                 </button>
//                 <button>
//                   <NavLink
//                     to="/upload"
//                     className={({ isActive }) =>
//                       `p-3 menu-profile transition-colors duration-300 ease-in-out ${
//                         isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'
//                       } w-full text-center`
//                     }
//                   >
//                     Create Post
//                   </NavLink>
//                 </button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;

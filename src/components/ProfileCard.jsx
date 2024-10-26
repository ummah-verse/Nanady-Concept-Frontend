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

  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  console.log("dar", darkMode)

  // Define classes for dark and light modes
  // const containerClass = darkMode === 'dark' ? 'bg-neutral-900 text-white' : 'bg-[#ebfff8] text-black border-neutral-950 border-4 shadow-xl';
  const textLight = darkMode === 'dark' ? '' : 'text-gray-900 font-semibold';

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSetting = () => {
    navigate('/profile/setting');
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
    // <div className={`w-full rounded overflow-hidden shadow-lg profile-card p-6 flex-col relative ${containerClass}`}>
<div className={`w-full rounded overflow-hidden profile-card p-6 flex-col relative ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
  <div className="flex items-center gap-4">
    <div className="relative">
      <img
        className="w-24 h-24 rounded-full photo-profile"
        src={avatar_link || `https://ik.imagekit.io/eoeykxtr4/wakwaw.png?updatedAt=1729922813457`}
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
        <div className='flex items-center gap-2'>
          <h2 className="name text-xl font-bold">
            {name}
          </h2>
          <p className={`username ${textLight}`}>@{username}</p>
        </div>
        <div className="relative">
          <SlOptions
            className='text-black dark:text-white option cursor-pointer'
            onClick={toggleMenu}
          />
{menuVisible && (
  <div
    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-md z-50 ${
      darkMode === "dark" ? "bg-neutral-800" : "bg-[#f0f0f0ee]"
    }`}
  >
    <button
      onClick={handleSetting}
      className={`block px-4 py-2 text-sm w-full text-left ${
        darkMode === "dark"
          ? "text-gray-200 hover:bg-neutral-700"
          : "text-gray-700 hover:bg-neutral-300"
      }`}
    >
      Settings
    </button>
    <button
      onClick={handleLogout}
      className={`block px-4 py-2 text-sm w-full text-left ${
        darkMode === "dark"
          ? "text-gray-200 hover:bg-neutral-700"
          : "text-gray-700 hover:bg-neutral-300"
      }`}
    >
      Logout
    </button>
  </div>
)}



        </div>
      </div>
      
      <p className="bio mt-2 mb-4">{bio || "No bio available"}</p>

      <div className="menu-card mt-4 flex justify-between items-center gap-4">
        <p className="joined-on text-sm">Joined on {new Date(created_at).toLocaleDateString()}</p>
        
        <div className="menu-buttons flex gap-4">
          <button className="flex-grow h-12">
            <NavLink
              to="/profile/edit"
              className={({ isActive }) =>
                `p-4 transition-colors duration-300 ease-in-out w-full text-center flex justify-center items-center ${darkMode === 'dark'
                  ? `bg-neutral-800 ${isActive ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:bg-neutral-700'}`
                  : `bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] ${isActive ? 'border-black text-black' : 'text-gray-600 hover:bg-slate-300'}`}`
              }
            >
              Edit Profile
            </NavLink>
          </button>
          
          <button className="flex-grow h-12">
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `p-4 transition-colors duration-300 ease-in-out w-full text-center flex justify-center items-center ${darkMode === 'dark'
                  ? `bg-neutral-800 ${isActive ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:bg-neutral-700'}`
                  : `bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] ${isActive ? 'border-black text-black' : 'text-gray-600 hover:bg-slate-300'}`}`
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

import PropTypes from 'prop-types';
import { useState } from 'react';
import { SlOptions } from "react-icons/sl";
import { NavLink } from 'react-router-dom';
import './styles/ProfileCard.css';

const ProfileCard = ({ username, nama, bio, createdAt }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white profile-card p-6 flex flex-col relative">
      <div className="flex items-center">
        <img
          className="w-24 h-24 rounded-full photo-profile"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div className="ml-6 flex-grow">

          <div className='flex items-center justify-between gap-3'> 
            <div className='flex items-center gap-3'>
              <h2 className="name text-xl font-bold text-gray-900 dark:text-white">
                  {nama}
              </h2>
              <p className="username text-gray-600 dark:text-gray-400">@{username}</p>
            </div>
            <div className="relative">
              <SlOptions 
                className='text-black dark:text-white option cursor-pointer' 
                onClick={toggleMenu}
              />
              {menuVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-1 z-50">
                  {/* <NavLink
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    Settings
                  </NavLink> */}
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          <p className="bio mt-5 text-gray-700 dark:text-gray-300">{bio}</p>

          <div>
            <div className="menu-card mt-6 flex justify-between">
              <p className="joined-on text-sm flex items-center text-gray-500 dark:text-gray-400">
                  Joined on {new Date(createdAt).toLocaleDateString()}
              </p>

              <div className="menu-buttons gap-3 flex justify-between">
                <button>
                  <NavLink
                    to="/profile/edit"
                    className={({ isActive }) =>
                      `p-3 menu-profile transition-colors duration-300 ease-in-out ${
                        isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'
                      } w-full text-center`
                    }
                  >
                    Edit Profile
                  </NavLink>
                </button>
                <button>
                  <NavLink
                    to="/upload"
                    className={({ isActive }) =>
                      `p-3 menu-profile transition-colors duration-300 ease-in-out ${
                        isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'
                      } w-full text-center`
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
    </div>
  );
};

ProfileCard.propTypes = {
  username: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  bio: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default ProfileCard;

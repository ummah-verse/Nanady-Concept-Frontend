import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './styles/ProfileCard.css';

const ProfileCard = ({ username, nama, bio, createdAt }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white profile-card p-6 flex flex-col">
      <div className="flex items-center">
        <img
          className="w-24 h-24 rounded-full photo-profile"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div className="ml-6">

            <div className='flex items-center gap-3'>   
                <h2 className="name text-xl font-bold text-gray-900 dark:text-white">
                    {nama}
                </h2>
                <p className="username text-gray-600 dark:text-gray-400">@{username}</p>
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
                        to="/profile/yapping"
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
                        to="/profile/mini"
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

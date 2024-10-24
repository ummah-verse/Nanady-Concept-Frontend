import { Outlet, NavLink } from 'react-router-dom';
import './styles/Home.css';
import ProfileCard from './../components/ProfileCard';
import { BiStats } from "react-icons/bi";
import { IoIosStats } from "react-icons/io";


const Profile = () => {
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  // Define classes for dark and light modes
  const containerClass = darkMode === 'dark' ? 'bg-neutral-900 text-white' : 'text-black';

  return (
    <div className={`content-container ${containerClass}`}>
      <ProfileCard />
      <nav className={`flex justify-center space-x-4 w-full  ${darkMode === 'dark' ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-[#ffdbfd] border-neutral-950 border-4 shadow-xl my-2 text-black'}`}>
      <NavLink
          to="/profile/yapping"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out w-full text-center flex justify-center items-center ${
              darkMode === 'dark'
                ? `${isActive ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:bg-neutral-700'}`
                : `${isActive ? 'border-b-0 border-black text-black' : 'text-gray-600 hover:bg-slate-300'}`
            }`
          }
        >
              <BiStats size={28}/>
          </NavLink>

        <NavLink
          to="/profile/insight"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out w-full text-center flex justify-center items-center ${
              darkMode === 'dark'
                ? `${isActive ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:bg-neutral-700'}`
                : `${isActive ? 'border-b-0 border-black text-black' : 'text-gray-600 hover:bg-slate-300'}`
            }`
          }
        >
          <IoIosStats size={25}/>
        </NavLink>
        {/* Uncomment if needed */}
        {/* <NavLink
          to="/profile/diary"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Diary
        </NavLink> */}
      </nav>
      <div className={` ${darkMode ? '' : 'mt-5 border-black'}`}>
          <Outlet />
      </div>
    </div>
  );
};

export default Profile;

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
      <nav className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
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

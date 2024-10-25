import { Outlet, NavLink } from 'react-router-dom';
import { BiStats } from "react-icons/bi";
import { RiCalendarTodoLine } from "react-icons/ri";


import './styles/CreatePost.css'

const CreatePostLayout = () => {
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  return (
<div className={`content-container rounded overflow-hidden profile-card p-6 flex-col relative ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
<nav className="flex justify-center space-x-4 mb-4">
       <NavLink
          to="yapping"
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
        {/* <NavLink
          to="mini"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Mini
        </NavLink> */}
        {/* <NavLink
          to="diary"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Diary
        </NavLink> */}

        <NavLink
          
          to="reminder"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out w-full text-center flex justify-center items-center ${
              darkMode === 'dark'
                ? `${isActive ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:bg-neutral-700'}`
                : `${isActive ? 'border-b-0 border-black text-black' : 'text-gray-600 hover:bg-slate-300'}`
            }`
          }
        >
  <RiCalendarTodoLine size={28} />
  </NavLink>
      </nav>
      <div className="content p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default CreatePostLayout;

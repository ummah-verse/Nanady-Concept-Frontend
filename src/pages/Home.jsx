// src/pages/Home.jsx
import { NavLink, Outlet } from 'react-router-dom';
import { BiStats } from "react-icons/bi";


import './styles/Home.css';
import { RiCalendarTodoLine } from 'react-icons/ri';


const Home = () => {
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  return (
    <div className="content-container p-2 mx-auto"> {/* Default container styles */}


      {/* Dark mode styling applied only to the nav */}
      <nav className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
      {/* <nav className={`flex justify-center space-x-4 w-full ${darkMode === 'dark' ? 'bg-neutral-800 text-gray-300' : ' border-neutral-950 border-4 mb-2 bg-[#faffb2ee]'}`}> */}
        <NavLink
          to="/yapping"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out w-full text-center flex justify-center items-center ${
              darkMode === 'dark'
                ? `${isActive ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:bg-neutral-700'}`
                : `${isActive ? 'border-b-0 border-black text-black' : 'text-gray-600 hover:bg-slate-300'}`
            }`
          }
        >
          <BiStats size={28} />
        </NavLink>

        <NavLink
          to="/reminder"
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

      <div className="content">

        <Outlet /> {/* Nested components will be rendered here */}

      </div>
    </div>
  );
};

export default Home;

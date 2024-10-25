import { Outlet, NavLink } from 'react-router-dom';
import { MdOutlineArticle } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";

import './styles/Home.css';

const Ongoing = () => {

  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  return (
    <div className={`content-container`}>
      <nav className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
      <NavLink
          to="/ongoing/news"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out w-full text-center flex justify-center items-center ${
              darkMode === 'dark'
                ? `${isActive ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:bg-neutral-700'}`
                : `${isActive ? 'border-b-0 border-black text-black' : 'text-gray-600 hover:bg-slate-300'}`
            }`
          }
        >
          <MdOutlineArticle size={28}/>
        </NavLink>
        <NavLink
          to="/ongoing/statistic"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out w-full text-center flex justify-center items-center ${
              darkMode === 'dark'
                ? `${isActive ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:bg-neutral-700'}`
                : `${isActive ? 'border-b-0 border-black text-black' : 'text-gray-600 hover:bg-slate-300'}`
            }`
          }
        >
        <TfiStatsUp size={30} />
      </NavLink>
      </nav>
          <Outlet />
    </div>
  );
};

export default Ongoing;
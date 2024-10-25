import { Outlet } from 'react-router-dom';
import './styles/Home.css';

const Activity = () => {
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  return (
    <div className={`mt-2 content-container p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>

    {/* <div className={` ${darkMode === "dark" ? 'bg-neutral-900 text-gray-300' : 'bg-[#ffffff] border-neutral-950 shadow-xl border-4 mb-2'} shadow-md`}> */}
      <nav className="flex justify-center space-x-4 w-full">
      {/* <NavLink
          to="/notification/interaction"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Interaction
        </NavLink>
        <NavLink
          to="/activity/analytic"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Analytic
        </NavLink> */}
      </nav>
      <div className="content">
        <Outlet /> {/* Komponen nested akan dirender di sini */}
      </div>
    </div>
  );
};

export default Activity;

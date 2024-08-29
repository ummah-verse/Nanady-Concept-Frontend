// src/pages/Home.jsx
import { Outlet, NavLink } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  return (
    <div className='text-white bg-neutral-800 content-container'>
      <nav className="flex justify-center space-x-4 mb-4 w-full">
        <NavLink
          to="/yapping"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Yapping
        </NavLink>
        <NavLink
          to="/mini"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Mini
        </NavLink>
        <NavLink
          to="/diary"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Diary
        </NavLink>
      </nav>
      <div className="content">
        <Outlet /> {/* Komponen nested akan dirender di sini */}
      </div>
    </div>
  );
};

export default Home;

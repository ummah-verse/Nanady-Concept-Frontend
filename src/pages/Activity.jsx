import { Outlet } from 'react-router-dom';
import './styles/Home.css';

const Activity = () => {
  return (
    <div className='text-white bg-neutral-900 content-container'>
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

import { Outlet, NavLink } from 'react-router-dom';
import './styles/Home.css';
import ProfileCard from './../components/ProfileCard';

const Profile = () => {
  return (
    <div className='text-white bg-neutral-900 content-container'>
        <ProfileCard
        />
      <nav className="flex justify-center space-x-4 w-full">
        <NavLink
          to="/profile/yapping"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Yapping
        </NavLink>
        <NavLink
          to="/profile/insight"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Insight
        </NavLink>
        {/* <NavLink
          to="/profile/diary"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Diary
        </NavLink> */}
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;

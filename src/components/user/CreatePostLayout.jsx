import { NavLink, Outlet } from 'react-router-dom';
import './styles/CreatePost.css'

const CreatePostLayout = () => {
  return (
    <div className="content-container text-white bg-neutral-900">
      <nav className="flex justify-center space-x-4 mb-4">
        <NavLink
          to="yapping"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Yapping
        </NavLink>
        <NavLink
          to="mini"
          className={({ isActive }) =>
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Mini
        </NavLink>
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
            `p-4 transition-colors duration-300 ease-in-out ${isActive ? 'border-b-2 border-white' : 'text-white hover:bg-neutral-700'} w-full text-center`
          }
        >
          Reminder
        </NavLink>
      </nav>
      <div className="content p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default CreatePostLayout;

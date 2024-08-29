import { Link } from 'react-router-dom';
import { GrHomeRounded } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { RiNotificationLine } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";

import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className='flex justify-center items-center p-2 shadow-md navbar'>
      <Link to="/yapping" className="mx-4 p-4 hover:bg-neutral-700 rounded transition-colors duration-300 ease-in-out">
        <GrHomeRounded size={25} className="custom-icon" />
      </Link>
      <Link to="/search" className="mx-4 p-4 hover:bg-neutral-700 rounded transition-colors duration-300 ease-in-out">
        <IoSearch size={26} />
      </Link>
      <Link to="/activity" className="mx-4 p-4 hover:bg-neutral-700 rounded transition-colors duration-300 ease-in-out">
        <FiActivity size={25} />
      </Link>
      <Link to="/notifications" className="mx-4 p-4 hover:bg-neutral-700 rounded transition-colors duration-300 ease-in-out">
        <RiNotificationLine size={28} />
      </Link>
      <Link to="/profile" className="mx-4 p-4 hover:bg-neutral-700 rounded transition-colors duration-300 ease-in-out">
        <LuUser size={30} />
      </Link>
    </nav>
  );
};

export default Navbar;
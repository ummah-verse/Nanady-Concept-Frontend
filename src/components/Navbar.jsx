import { Link } from 'react-router-dom';
import { GrHomeRounded } from "react-icons/gr";
// import { IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { BiNews } from "react-icons/bi";
// import { FiActivity } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";


import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className='flex justify-center items-center p-2 navbar'>
      <Link to="/yapping" className="mx-4 p-4  rounded transition-colors duration-300 ease-in-out">
        <GrHomeRounded size={25} className="custom-icon" />
      </Link>

      <Link to="/explore" className="mx-4 p-4  rounded transition-colors duration-300 ease-in-out">
        <MdOutlineExplore size={26} />
      </Link>

      <Link to="/ongoing" className="mx-4 p-4  rounded transition-colors duration-300 ease-in-out">
        <BiNews size={28} />
      </Link>

      <Link to="/notification" className="mx-4 p-4  rounded transition-colors duration-300 ease-in-out">
        <RiNotification2Line size={28} />
      </Link>

      <Link to="/profile" className="mx-4 p-4  rounded transition-colors duration-300 ease-in-out">
        <LuUser size={30} />
      </Link>
    </nav>
  );
};

export default Navbar;
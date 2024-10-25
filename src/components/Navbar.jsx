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

  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  return (
    <nav className={`flex w-full justify-center items-center p-1 navbar ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px]'}`}>

    {/* <nav className={`flex w-full justify-center items-center p-2 navbar ${darkMode === 'dark'?  'bg-[#0c0c0c] text-[rgba(231,231,231,0.61)]' : 'bg-[#f3f3f3d2] text-[rgba(41,41,41,0.75)] border-b-4 border-black active:text-[rgba(41,41,41,0.75)] active:font-black focus:text-[rgba(41,41,41,0.75)] focus:font-black'}`}> */}
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
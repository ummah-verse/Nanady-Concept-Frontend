// src/ThemeToggleButton.jsx
import PropTypes from 'prop-types'; // Impor PropTypes
import { useTheme } from './hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggleButton = ({ className }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center p-2 rounded ${className}`} // Menggunakan className yang diberikan
    >
      {darkMode === 'dark' ? (
        <>
          <FaMoon className="h-6 w-6 text-yellow-400" />
          {/* <span className="ml-2">Light Mode</span> */}
        </>
      ) : (
        <>
          <FaSun className="h-6 w-6 text-gray-800" />
          {/* <span className="ml-2">Dark Mode</span> */}
        </>
      )}
    </button>
  );
};

// Menambahkan validasi PropTypes
ThemeToggleButton.propTypes = {
  className: PropTypes.string, // className diharapkan bertipe string
};

export default ThemeToggleButton;

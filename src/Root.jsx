// src/App.jsx

import './Main.css'
import './App.css';

import { Outlet } from 'react-router-dom';
import { useTheme } from './hooks/useTheme'; // Adjust the import path as necessary
import ThemeToggleButton from './ThemeToggleButton'


const Root = () => {

  const { darkMode } = useTheme();

  return (
        <div className={`main-content-container items-center login-page ${darkMode === 'dark' ? ' text-white bg-neutral-950' : 'text-black'}`}>
            <ThemeToggleButton className='fixed top-4 right-4' /> {/* Atur posisi tombol */}
            <Outlet/>
        </div>

  );
};

export default Root;

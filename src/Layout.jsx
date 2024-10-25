import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import './Main.css';
import ReminderNotification from './components/ReminderNotification';
import RightFeature from './RightFeature';
import LeftFeature from './LeftFeature';
import './sidefeature.css'





const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const startTime = Date.now(); // Capture start time directly
  const darkMode= localStorage.getItem('theme') || 'light'

  useEffect(() => {
    const token = localStorage.getItem('token');


    const checkAuth = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data.status && data.data) {
            setIsAuthenticated(true);
          } else {
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const duration = Math.floor((Date.now() - startTime) / 1000); // Hitung duration dalam detik
        const usageData = {
          event: 'user_exit',
          // Anda tidak perlu menyertakan duration di sini jika sudah ada di URL
        };
    
        // Tambahkan duration sebagai parameter query
        const url = `${import.meta.env.VITE_API_URL_SOCKET}/usage?token=${encodeURIComponent(token)}&duration=${duration}`;

        // Gunakan navigator.sendBeacon untuk mengirim data
        navigator.sendBeacon(url, JSON.stringify(usageData));
      }
    };    

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [startTime]); // startTime is now a constant value




  if (!isAuthenticated) {
    return <div></div>; // Placeholder saat sedang memeriksa otentikasi
  }

  return (
    <div
      className={`main-content-container w-full min-h-screen 
        ${darkMode === 'dark' ? 'bg-neutral-950 text-white' : 'bg-gradient-radial-light text-black'}`}
    >
      <div style={ { position : 'fixed'}} id={`${darkMode === 'dark' ? 'stars' : 'starlight1'}`}></div>
      <div style={ { position : 'fixed'}} id={`${darkMode === 'dark' ? 'stars2' : 'starlight2'}`}></div>

      <div className='flex justify-center'>
      <Navbar />
        <ReminderNotification />
      </div>

      <div className="w-full flex justify-between content-outlet p-4">
          <div className='left-feature side-feature '>
            <LeftFeature/>
          </div>        
          <Outlet /> {/* This will render the content based on the route */}

          <div className='right-feature side-feature '>
          <RightFeature/>
          </div>   
      </div>

    </div>
  );
};

export default Layout;

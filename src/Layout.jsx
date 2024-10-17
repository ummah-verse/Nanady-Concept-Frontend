import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import './Main.css';
import ReminderNotification from './components/ReminderNotification';

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const startTime = Date.now(); // Capture start time directly

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
    <div className='main-content-container w-full bg-neutral-1000 dark:bg-neutral-800 min-h-screen'>
      <div className='flex justify-center'>
        <Navbar />
        <ReminderNotification/>
      </div>
      <div className="container mx-auto flex justify-center content-outlet p-4">
        <Outlet /> {/* This will render the content based on the route */}
      </div>
    </div>
  );
};

export default Layout;

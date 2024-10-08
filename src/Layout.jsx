// src/App.jsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import './Main.css';

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const checkAuth = async () => {
      if (!token) {
        navigate('/login'); // Redirect to login if no token
      } else {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();

            console.log(data)
            // Check if user exists in response
            if (data.status && data.data) {
              setIsAuthenticated(true);
            } else {
              navigate('/login'); // Redirect to login if user not found
            }
          } else {
            // Token expired or invalid, redirect to login
            navigate('/login');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          navigate('/login'); // Redirect to login on error
        }
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    // Optionally, display a loading message or placeholder until authentication is checked
    return <div></div>;
  }

  return (
    <div className='main-content-container'>
      <div className='flex justify-center'>
        <Navbar />
      </div>
      <div className="container mx-auto flex justify-center content-outlet">
        <Outlet /> {/* This will render the content based on the route */}
      </div>
    </div>
  );
};

export default Layout;

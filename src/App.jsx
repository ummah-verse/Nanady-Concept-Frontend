// src/App.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'
import './Main.css'

const App = () => {
  return (
    <div className='scroll-container'>
      <Navbar />
      <div className="container mx-auto p-4 flex justify-center"> {/* Add container class */}
        <Outlet /> {/* This will render the content based on the route */}
      </div>
    </div>
  );
};

export default App;

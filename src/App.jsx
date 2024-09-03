// src/App.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'
import './Main.css'

const App = () => {
  return (
      <div className='main-content-container'>
        <div className='flex justify-center'>
          <Navbar />
        </div>
            <div className="container mx-auto flex justify-center content-outlet"> {/* Add container class */}
              <Outlet /> {/* This will render the content based on the route */}
          </div>
      </div>
  );
};

export default App;

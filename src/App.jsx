// src/App.jsx

import './Main.css'
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
      <div className='main-content-container items-center login-page'>
        <Outlet/>
      </div>
  );
};

export default App;

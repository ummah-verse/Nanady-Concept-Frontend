import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Search from './pages/Search';
import Yapping from './components/Yapping';
import Mini from './components/Mini';
import Diary from './components/Diary';

import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} /> {/* Home as the default route */}
        <Route path="/" element={<Home />}> {/* Home page */}
          <Route index element={<Yapping />}/>
          <Route path="yapping" element={<Yapping />} />
          <Route path="mini" element={<Mini />} />
          <Route path="diary" element={<Diary />} />
        </Route>
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

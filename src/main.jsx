import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Yapping from './components/Yapping';
import Mini from './components/Mini';
import Diary from './components/Diary';

import './App.css';
import Activity from './pages/Activity';
import Reminder from './components/Reminder';
import Analytic from './components/Analytic';
import Interaction from './components/Interaction';
import Ongoing from './pages/Ongoing';
import Conflict from './components/Conflict';
import Starvation from './components/Starvation';
import Climate from './components/Climate';
import Profile from './pages/Profile';
import UserYapping from './components/user/UserYapping';
import MyMini from './components/user/MyMini';
import UserDiary from './components/user/UserDiary';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>

        <Route index element={<Navigate to="yapping" />} /> {/* Redirect / to /yapping */}
        <Route path="/" element={<Home />}> {/* Home page */}
          <Route index element={<Navigate to="/h/yapping" />} /> {/* Redirect / to /yapping */}
          <Route path="yapping" element={<Yapping />} />
          <Route path="mini" element={<Mini />} />
          <Route path="diary" element={<Diary />} />
        </Route>

        <Route path="explore" element={<Explore />} />

        <Route path="activity" element={<Activity />} />
        <Route path="/activity" element={<Activity />}> 
          <Route index element={<Navigate to="reminder" />} /> 
          <Route path="reminder" element={<Reminder />} />
          <Route path="analytic" element={<Analytic />} />
          <Route path="interaction" element={<Interaction />} />
        </Route>

        <Route path="ongoing" element={<Ongoing />} />
        <Route path="/ongoing" element={<Ongoing />}> 
          <Route index element={<Navigate to="conflict" />} /> 
          <Route path="conflict" element={<Conflict />} />
          <Route path="starvation" element={<Starvation />} />
          <Route path="climate" element={<Climate />} />
        </Route>


        <Route path="profile" element={<Profile />} />

        <Route path="/profile" element={<Profile />}> 
          <Route index element={<Navigate to="yapping" />} /> 
          <Route path="yapping" element={<UserYapping />} />
          <Route path="mini" element={<MyMini />} />
          <Route path="diary" element={<UserDiary />} />
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>
);

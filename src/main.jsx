import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Yapping from './components/Yapping';
import Mini from './components/Mini';
// import Diary from './components/Diary';

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
// import UserDiary from './components/user/UserDiary';
import EditProfile from './components/user/EditProfile';
import CreatePostLayout from './components/user/CreatePostLayout';
// import DiaryForm from './components/user/components/DiaryForm';
import MiniForm from './components/user/components/MiniForm';
import YappingForm from './components/user/components/YappingForm';
import ReminderForm from './components/user/components/ReminderForm';
import Layout from './Layout';
import LoginForm from './pages/Login';
import App from './App';
import YappingDetail from './components/YappingDetail';
import MiniDetail from './components/MiniDetail';
// import DiaryDetail from './components/DiaryDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<App />} />
      <Route path="/login" element={<App />}> 
        <Route path="" element={<LoginForm />} />
      </Route>

      <Route path="/" element={<Layout/>}>

        <Route index element={<Navigate to="yapping" />} /> {/* Redirect / to /yapping */}
        <Route path="/" element={<Home />}> {/* Home page */}
          <Route index element={<Navigate to="/yapping" />} /> {/* Redirect / to /yapping */}
          <Route path="yapping" element={<Yapping />} />
          <Route path="yapping/:id" element={<YappingDetail />} />
          <Route path="mini" element={<Mini />} />
          <Route path="mini/:id" element={<MiniDetail />} />
          {/* <Route path="diary" element={<Diary />} />
          <Route path="diary/:id" element={<DiaryDetail />} /> */}
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
          {/* <Route path="diary" element={<UserDiary />} /> */}
          <Route path="edit" element={<EditProfile />} />


        </Route>

        <Route path="/upload" element={<CreatePostLayout />}>
          <Route index element={<Navigate to="yapping" />} /> 
          <Route path="yapping" element={<YappingForm />} />
          <Route path="mini" element={<MiniForm />} />
          {/* <Route path="diary" element={<DiaryForm />} /> */}
          <Route path="reminder" element={<ReminderForm />} />
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>
);

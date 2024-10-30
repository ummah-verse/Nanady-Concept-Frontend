import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Yapping from './components/Yapping';
// import Mini from './components/Mini';
// import Diary from './components/Diary';

import Activity from './pages/Activity';
import Reminder from './components/Reminder';
import Analytic from './components/Analytic';
import Interaction from './components/Interaction';
import Ongoing from './pages/Ongoing';
// import Conflict from './components/Conflict';
// import Climate from './components/Climate';
import Profile from './pages/Profile';
import UserYapping from './components/user/UserYapping';
// import MyMini from './components/user/MyMini';
// import UserDiary from './components/user/UserDiary';
import EditProfile from './components/user/EditProfile';
import CreatePostLayout from './components/user/CreatePostLayout';
// import DiaryForm from './components/user/components/DiaryForm';
// import MiniForm from './components/user/components/MiniForm';
import YappingForm from './components/user/components/YappingForm';
import ReminderForm from './components/user/components/ReminderForm';
import Layout from './Layout';
import LoginForm from './pages/Login';
import App from './App';
import YappingDetail from './components/YappingDetail';
import Statistic from './components/Statistic';
import NewsComponent from './components/News';
import RegisterForm from './pages/Register';
import UploadProfileForm from './components/user/components/UploadProfileForm.';
import OtherUserDetail from './pages/OtherUserDetail';
import Setting from './components/user/components/Setting';
import Landing from './home/Landing';
// import Analytic
// import MiniDetail from './components/MiniDetail';
// import DiaryDetail from './components/DiaryDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<App />} />
      <Route path="/login" element={<App />}> 
        <Route path="" element={<LoginForm />} />
      </Route>

      <Route path="/register" element={<App />} />
      <Route path="/register" element={<App />}> 
        <Route path="" element={<RegisterForm />} />
      </Route>


      <Route path="/home" element={<Landing />} />
      <Route path="/home" element={<Landing />}> 
        <Route path="" element={<Landing/>} />
      </Route>

      <Route path="/" element={<Layout/>}>

        <Route path="/:username" element={<OtherUserDetail />} />

        <Route index element={<Navigate to="yapping" />} />

        <Route path="/" element={<Home />}> 
          <Route index element={<Navigate to="/yapping" />} /> 
          <Route path="yapping" element={<Yapping />} />
          <Route path="yapping/:id" element={<YappingDetail />} />
          <Route path="reminder" element={<Reminder />} />

          {/* <Route path="mini" element={<Mini />} /> */}
          {/* <Route path="mini/:id" element={<MiniDetail />} /> */}
          {/* <Route path="diary" element={<Diary />} />
          <Route path="diary/:id" element={<DiaryDetail />} /> */}
        </Route>


        <Route path="explore" element={<Explore />} />

        <Route path="/notification" element={<Activity />}> 
          <Route index element={<Interaction />} /> {/* Directly renders Interaction at /notification */}
        </Route>


        <Route path="ongoing" element={<Ongoing />} />
        <Route path="/ongoing" element={<Ongoing />}> 
          <Route index element={<Navigate to="news" />} /> 
          <Route path="news" element={<NewsComponent/>} />
          <Route path="statistic" element={<Statistic />} />
        </Route>


        <Route path="profile" element={<Profile />} />

        <Route path="/profile" element={<Profile />}> 
          <Route index element={<Navigate to="yapping" />} /> 
          <Route path="yapping" element={<UserYapping />} />
          <Route path="setting" element={<Setting />} />
          <Route path="insight" element={<Analytic />} />
          {/* <Route path="diary" element={<UserDiary />} /> */}
          <Route path="edit" element={<EditProfile />} />
          <Route path="avatar/edit" element={<UploadProfileForm />} />


        </Route>

        <Route path="/upload" element={<CreatePostLayout />}>
          <Route index element={<Navigate to="yapping" />} /> 
          <Route path="yapping" element={<YappingForm />} />
          {/* <Route path="mini" element={<MiniForm />} /> */}
          {/* <Route path="diary" element={<DiaryForm />} /> */}
          <Route path="reminder" element={<ReminderForm />} />
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>
);

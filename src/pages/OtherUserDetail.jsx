import { useParams } from 'react-router-dom';
import ProfileOther from './ProfileOther';
import YappingOther from './../components/YappingOther';

const OtherUserDetail = () => {
  const { username } = useParams(); // Mengambil username dari URL params

  return (
    <div className="mx-auto flex justify-start items-start content-container flex-col"> {/* Mengatur agar mulai dari atas */}
      <ProfileOther username={username} /> {/* Profil di bagian paling atas */}
      <YappingOther username={username} /> {/* Yapping di bawahnya */}
    </div>
  );
};

export default OtherUserDetail;


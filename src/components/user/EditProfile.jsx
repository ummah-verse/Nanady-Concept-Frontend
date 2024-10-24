import { useEffect, useState } from "react";
import EditProfileForm from "./components/EditProfile";
import { ThemeProvider } from './../../ThemeProvider';

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();
        if (result.status) {
          setProfileData(result.data); // Set profile data to state
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return <div></div>; // Loading state
  }

  return (
    <>
    <ThemeProvider>
    <EditProfileForm
        initialUsername={profileData.username}
        initialNama={profileData.name || ""}
        initialBio={profileData.bio || ""}
      />
    </ThemeProvider>

    </>
  );
};

export default EditProfile;

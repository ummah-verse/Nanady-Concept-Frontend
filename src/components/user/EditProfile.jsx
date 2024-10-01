import { useEffect, useState } from "react";
import EditProfileForm from "./components/EditProfile";

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const availablePreferences = [
    "Computer Science",
    "Medicine",
    "Politic",
    "Nature",
    "Animal",
    "Tips",
    "Photography",
    "Car",
  ];

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
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <EditProfileForm
        initialUsername={profileData.username}
        initialNama={profileData.name || ""}
        initialBio={profileData.bio || ""}
        availablePreferences={availablePreferences}
      />
    </>
  );
};

export default EditProfile;

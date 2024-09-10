import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/EditProfile.css'

const EditProfileForm = ({ initialUsername, initialNama, initialBio, availablePreferences }) => {
  const [username, setUsername] = useState(initialUsername);
  const [nama, setNama] = useState(initialNama);
  const [bio, setBio] = useState(initialBio);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleAddPreference = (preference) => {
    if (selectedPreferences.length < 8 && !selectedPreferences.includes(preference)) {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const handleRemovePreference = (preference) => {
    setSelectedPreferences(selectedPreferences.filter((pref) => pref !== preference));
  };

  const filteredPreferences = availablePreferences.filter(
    (pref) =>
      pref.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedPreferences.includes(pref)
  );

  const handleSaveChanges = () => {
    // Save changes logic here
    console.log('Profile updated:', { username, nama, bio, selectedPreferences });
  };

  return (
    <div className="edit-profile-form p-6 max-w-lg mx-auto bg-neutral-900 ">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <label className="block mb-2 font-semibold">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-form-text bg-neutral-800 w-full p-2 mb-4 "
      />

      <label className=" block mb-2 font-semibold">Name</label>
      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="input-form-text bg-neutral-800 w-full p-2 mb-4 "
      />

      <label className="block mb-2 font-semibold">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="input-form-textarea bg-neutral-800 w-full p-2 mb-4"
      ></textarea>

      <label className="block mb-2 font-semibold">Search Preferences</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search and add preferences..."
        className="input-form-text bg-neutral-800 w-full p-2 mb-4 "
      />

      <ul className="mb-4">
        {filteredPreferences.map((preference) => (
          <li
            key={preference}
            className="p-2 mb-2 bg-neutral-800 rounded flex justify-between items-center cursor-pointer"
            onClick={() => handleAddPreference(preference)}
          >
            {preference}
            <button
              className="text-white bg-blue-500 px-2 py-1 rounded"
              onClick={() => handleAddPreference(preference)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">Selected Preferences (Max 8):</h3>
      <ul className="mb-4">
        {selectedPreferences.map((preference) => (
          <li
            key={preference}
            className="p-2 mb-2 bg-neutral-800 rounded flex justify-between items-center"
          >
            {preference}
            <button
              className="text-white bg-red-500 px-2 py-1 rounded"
              onClick={() => handleRemovePreference(preference)}
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <button
        className="w-full p-2 bg-blue-600 text-white font-semibold rounded"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};

EditProfileForm.propTypes = {
  initialUsername: PropTypes.string.isRequired,
  initialNama: PropTypes.string.isRequired,
  initialBio: PropTypes.string.isRequired,
  availablePreferences: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditProfileForm;

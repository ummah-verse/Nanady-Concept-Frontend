import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThemeToggleButton from './../../../ThemeToggleButton';
import './styles/EditProfile.css';
import { ThemeProvider } from '../../../ThemeProvider';

const EditProfileForm = ({ initialUsername, initialNama, initialBio }) => {

    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    console.log(darkMode)


    const [username, setUsername] = useState(initialUsername);
    const [name, setNama] = useState(initialNama);
    const [bio, setBio] = useState(initialBio);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [filteredPreferences, setFilteredPreferences] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState('');

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleAddPreference = (preference) => {
        if (Object.keys(selectedPreferences).length < 4 && !selectedPreferences[preference]) {
            setSelectedPreferences((prev) => ({
                ...prev,
                [preference]: { total_engage: 0 },
            }));
        }
    };

    const handleRemovePreference = (preference) => {
        const newPreferences = { ...selectedPreferences };
        delete newPreferences[preference];
        setSelectedPreferences(newPreferences);
    };

    useEffect(() => {
        const fetchPreferences = async () => {
            if (searchTerm.trim() === '') {
                setFilteredPreferences([]);
                return;
            }

            setIsLoading(true);
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/search-reference?reference=${searchTerm}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();
                if (result.status) {
                    setFilteredPreferences(result.data);
                } else {
                    setFilteredPreferences([]);
                }
            } catch (err) {
                console.log(err);
                setToastMessage('Failed to fetch preferences.');
                setToastType('error');
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchPreferences();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSaveChanges = async () => {
        const token = localStorage.getItem('token');
        const updatedData = {};
    
        // Cek perubahan pada username, name, dan bio
        if (username !== initialUsername) updatedData.username = username;
        if (name !== initialNama) updatedData.name = name;
        if (bio !== initialBio) updatedData.bio = bio;
    
        // Cek jika ada preferensi yang diubah
        const preferenceKeys = Object.keys(selectedPreferences);
        if (preferenceKeys.length > 0) {
            updatedData.preference_yappin = {};
            preferenceKeys.forEach((preference, index) => {
                updatedData.preference_yappin[`preference_tag_${index + 1}`] = preference;
                updatedData.preference_yappin[`total_engage_${index + 1}`] = selectedPreferences[preference]?.total_engage || 0;
            });
        }
    
        // Jika tidak ada data yang diubah, jangan lakukan request
        if (Object.keys(updatedData).length === 0) {
            setToastMessage('No changes made.');
            setToastType('info');
            return;
        }

        console.log(updatedData)
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
                method: 'PUT',



                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });
    
            const result = await response.json();

            console.log(result)

    
            if (result.status) {
                localStorage.setItem('token', result.data.token);
                setToastMessage('Profile updated successfully!');
                setToastType('success');
            } else {
                setToastMessage(result.message || result.error || 'Failed to update profile.');
                setToastType('error');
            }
        } catch (err) {
            console.error(err);
            setToastMessage('An error occurred while updating the profile.');
            setToastType('error');
        }
    };
    

    return (
        <ThemeProvider>
        {/* <div className={` p-6 mx-auto w-full ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] border-neutral-950 border-4 mb-2'}`}> */}
        <div className={`edit-profile-form mx-auto rounded overflow-hidden profile-card p-6 flex-col relative ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>

            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <div onClick={handleRefresh}>
                    <ThemeToggleButton className={''}/>
                </div>

            </div>

            <label className="block mb-2 font-semibold">Username</label>
            <input
                type="text"
                placeholder={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`input-form-text w-full p-2 mb-4  ${darkMode === "dark" ? 'bg-neutral-800 ' : 'bg-slate-200'}`}
            />

            <label className="block mb-2 font-semibold">Name</label>
            <input
                type="text"
                placeholder={name}
                onChange={(e) => setNama(e.target.value)}
                className={`input-form-text w-full p-2 mb-4  ${darkMode === "dark" ? 'bg-neutral-800 ' : 'bg-slate-200'}`}
            />

            <label className="block mb-2 font-semibold">Bio</label>
            <textarea
                placeholder={bio}
                onChange={(e) => setBio(e.target.value)}
                className={`input-form-text w-full p-2 mb-4  ${darkMode === "dark" ? 'bg-neutral-800 ' : 'bg-slate-200'}`}
            ></textarea>

            <label className="block mb-2 font-semibold">Search Preferences</label>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search and add preferences..."
                className={`input-form-text w-full p-2 mb-4  ${darkMode === "dark" ? 'bg-neutral-800 ' : 'bg-slate-200'}`}
            />

            {isLoading ? (
                <p></p>
            ) : (
                <ul className="mb-4">
                    {filteredPreferences.map((preference) => (
                        <li
                            key={preference.name} 
                            className={`p-2 mb-2 rounded flex justify-between items-center cursor-pointer ${darkMode === "dark" ? 'bg-neutral-800 ' : 'bg-gray-200'}`}
                            onClick={() => handleAddPreference(preference.name)}
                        >
                            {preference.name}
                            <button
                                className="text-white bg-blue-500 px-2 py-1 rounded"
                                onClick={() => handleAddPreference(preference.name)}
                            >
                                Add
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h3 className="font-semibold mb-2">Selected Preferences (Max 4):</h3>
            <ul className="mb-4">
                {Object.keys(selectedPreferences).map((preference) => (
                    <li
                        key={preference}
                        className={`p-2 mb-2 rounded flex justify-between items-center ${darkMode === "dark" ? 'bg-neutral-800 ' : 'bg-gray-200'}`}
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

            {toastMessage && (
                <div className="fixed bottom-5 right-5 custom-toast">
                    <div className="bg-slate-600 text-neutral-200 p-4 rounded-lg shadow-lg flex items-center">
                        <div className={`inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {toastType === 'success' ? '✔️' : '❌'}
                        </div>
                        <div className="ml-3 text-sm font-normal">
                            {toastMessage}
                        </div>
                        <button onClick={() => setToastMessage(null)} className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8">
                            <span className="sr-only">Close</span>
                            ✖️
                        </button>
                    </div>
                </div>
            )}
            </div>
        </ThemeProvider>

    );
};

EditProfileForm.propTypes = {
    initialUsername: PropTypes.string.isRequired,
    initialNama: PropTypes.string.isRequired,
    initialBio: PropTypes.string.isRequired,
};

export default EditProfileForm;

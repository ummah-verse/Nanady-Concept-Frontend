import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/EditProfile.css';

const EditProfileForm = ({ initialUsername, initialNama, initialBio }) => {
    const [username, setUsername] = useState(initialUsername);
    const [name, setNama] = useState(initialNama);
    const [bio, setBio] = useState(initialBio);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState({}); // Store selected preferences
    const [filteredPreferences, setFilteredPreferences] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleAddPreference = (preference) => {
        if (Object.keys(selectedPreferences).length < 4 && !selectedPreferences[preference]) { // Limit to 4 preferences
            setSelectedPreferences((prev) => ({
                ...prev,
                [preference]: { total_engage: 0 }, // Set default total_engage (or modify as needed)
            }));
        }
    };

    const handleRemovePreference = (preference) => {
        const newPreferences = { ...selectedPreferences };
        delete newPreferences[preference]; // Remove the preference
        setSelectedPreferences(newPreferences);
    };

    useEffect(() => {
        const fetchPreferences = async () => {
            if (searchTerm.trim() === '') {
                setFilteredPreferences([]); // Clear when there's no input
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
                    setFilteredPreferences([]); // Clear if there are no results
                }
                setError(null);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch preferences.');
                setFilteredPreferences([]);
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchPreferences();
        }, 500); // Debounce to reduce API requests

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSaveChanges = async () => {
        const token = localStorage.getItem('token');

        // Prepare the updatedData with only the changed preferences
        const updatedData = {
            username,
            name,
            bio,
            preference_yappin: {}
        };

        // Only add preferences that exist in selectedPreferences
        const preferenceKeys = Object.keys(selectedPreferences);
        if (preferenceKeys.length > 0) {
            preferenceKeys.forEach((preference, index) => {
                updatedData.preference_yappin[`preference_tag_${index + 1}`] = preference;
                updatedData.preference_yappin[`total_engage_${index + 1}`] = selectedPreferences[preference]?.total_engage || 0;
            });
        }

        console.log(updatedData);

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

            if (result.status) {
                setSuccessMessage('Profile updated successfully!');
                setError(null);
            } else {
                setError(result.message || 'Failed to update profile.');
                setSuccessMessage('');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while updating the profile.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="edit-profile-form p-6 max-w-lg mx-auto bg-neutral-900">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            <label className="block mb-2 font-semibold">Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-form-text bg-neutral-800 w-full p-2 mb-4"
            />

            <label className="block mb-2 font-semibold">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setNama(e.target.value)}
                className="input-form-text bg-neutral-800 w-full p-2 mb-4"
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
                className="input-form-text bg-neutral-800 w-full p-2 mb-4"
            />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="mb-4">
                    {filteredPreferences.map((preference) => (
                        <li
                            key={preference.name} // Assuming `name` is the preference identifier from API
                            className="p-2 mb-2 bg-neutral-800 rounded flex justify-between items-center cursor-pointer"
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

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
    );
};

EditProfileForm.propTypes = {
    initialUsername: PropTypes.string.isRequired,
    initialNama: PropTypes.string.isRequired,
    initialBio: PropTypes.string.isRequired,
};

export default EditProfileForm;

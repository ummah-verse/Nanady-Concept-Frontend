import { useState } from 'react';
import LoadingPopupPhoto from './atom/LoadingPopUpPhoto'; // Import the LoadingPopup component
import { Toast } from 'flowbite-react'; // Import Flowbite components
import './styles/EditProfile.css'

const UploadProfileForm = () => {
  const darkMode = localStorage.getItem('theme') || 'light'

  const [file, setFile] = useState(null);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setToastMessage('Please select a file.');
      setToastType('error');
      return;
    }

    setIsLoadingSubmit(true); // Show the loading popup

    const token = localStorage.getItem('token'); // Assuming you need a token for authentication

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile-pic`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Attach token for authorization
        },
        body: formData,
      });

      const result = await response.json();

      if (result.status) {
        setToastMessage('Photo uploaded successfully!');
        setToastType('success');
        setTimeout(() => {
          window.location.reload(); // Refresh the page after success
        }, 2000);
      } else {
        setToastMessage(result.error|| 'Failed to upload photo.');
        setToastType('error');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      setToastMessage('An error occurred during the upload. Please try again.');
      setToastType('error');
    } finally {
      setIsLoadingSubmit(false); // Hide the loading popup
    }
  };

  return (
    // <div className={`upload-photo-form w-full p-6  ${darkMode === "dark" ? 'bg-neutral-800 pt-0 mt-10' : 'bg-slate-300 border-neutral-950 border-4 shadow-xl'} `}>
              <div className={`upload-photo-form w-full p-6 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>

      {/* Loading Popup */}
      <LoadingPopupPhoto isLoadingSubmit={isLoadingSubmit} />

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-6 w-full">
        <div className="w-full">
          <label className="block text-sm font-medium text-white dark:text-gray-300 mb-2">
            {/* Upload Profile Picture: */}
          </label>
          <div className="flex items-center space-x-4 w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              
              className={`p-4 focus:outline-none w-full ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`p-4 text-white focus:outline-none w-full font-medium submit-button-edit-avatar ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#559eff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}

          disabled={isLoadingSubmit} // Disable button while loading
        >
          {isLoadingSubmit ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 custom-toast">
          <Toast className="bg-neutral-600 text-neutral-200">
            <div
              className={`inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg ${
                toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}
            >
              {toastType === 'success' ? '✔️' : '❌'}
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8"
            >
              <span className="sr-only">Close</span>
              ✖️
            </button>
          </Toast>
        </div>
      )}
    </div>
  );
};

export default UploadProfileForm;

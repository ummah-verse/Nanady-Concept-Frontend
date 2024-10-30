import { useState, useEffect } from 'react';
import { Toast } from 'flowbite-react'; // Import Flowbite components
import './styles/YappingForm.css';
import LoadingPopup from './atom/LoadingPopup'
import InstructionModal from './InstructionModal';
const YappingForm = () => {
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  console.log(darkMode)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isPublic, setIsPublic] = useState('1'); // Default ke publik
  const [selectedTags, setSelectedTags] = useState([]); // Menyimpan objek tag yang dipilih {id, name}
  const [tagSearch, setTagSearch] = useState('');
  const [tagResults, setTagResults] = useState([]); // Menyimpan objek tag hasil pencarian {id, name}
  const [isLoading, setIsLoading] = useState(false); // Untuk menampilkan loading state
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Default ke success

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePublicChange = (e) => {
    setIsPublic(e.target.value);
  };

  // Logika pencarian tag dengan debounce 500ms
  useEffect(() => {
    if (tagSearch.trim() === '') {
      setTagResults([]); // Kosongkan hasil jika pencarian kosong
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/search-reference?reference=${tagSearch}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Sertakan token Bearer
            },
          }
        );
        const data = await response.json();
        if (data.status) {
          setTagResults(data.data); // Simpan hasil pencarian {id, name}
        }
      } catch (fetchError) {
        console.error('Error fetching tags:', fetchError);
        showToastNotification('Gagal mengambil tag.', 'error');
      }

      setIsLoading(false);
    }, 500); // Delay pencarian 500ms

    // Cleanup timer jika input berubah sebelum timeout
    return () => clearTimeout(timer);
  }, [tagSearch]);

  // Handler untuk menambah tag (maksimal 4 tag)
  const handleAddTag = (tag) => {
    if (selectedTags.length < 4 && !selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    } else if (selectedTags.length >= 4) {
      showToastNotification('Anda hanya dapat memilih maksimal 4 tag.', 'error');
    }
  };

  // Handler untuk menghapus tag
  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  // Menampilkan notifikasi toast
  const showToastNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 3000); // Auto hide setelah 3 detik
  };

  // Handler untuk pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedTags.length < 4) {
      showToastNotification('Silakan pilih setidaknya 4 tag.', 'error');
      return;
    }

    // Validasi input
    if (selectedTags.length === 0) {
      showToastNotification('Silakan pilih setidaknya satu tag.', 'error');
      return;
    }

    if (caption.length < 1 || caption.length > 400) {
      showToastNotification('Caption harus antara 1 dan 400 karakter.', 'error');
      return;
    }

    if (location.length < 2 || location.length > 70) {
      showToastNotification('Lokasi harus antara 2 dan 70 karakter.', 'error');
      return;
    }

    // Buat objek FormData
    const formData = new FormData();
    if (photo) formData.append('image', photo);
    formData.append('caption', caption);
    formData.append('location', location);
    formData.append('is_public', isPublic);

    // Tambahkan tag yang dipilih ke FormData
    selectedTags.forEach((tag, index) => {
      formData.append(`tag_${index + 1}_id`, tag.id);
      formData.append(`tag_${index + 1}_name`, tag.name);
    });

    setIsLoadingSubmit(true);

    // Kirim data ke API
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/my-yapping`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, // Sertakan token Bearer
          // Jangan set 'Content-Type'; browser akan mengaturnya otomatis
        },
      });

      const result = await response.json();

      if (response.ok) {
        showToastNotification('Yapping berhasil dikirim!', 'success');
        // Reset form setelah sukses
        setPhoto(null);
        setCaption('');
        setLocation('');
        setIsPublic('1');
        setSelectedTags([]);
        setTagSearch('');
        setTagResults([]);
      } else {
        showToastNotification(result.error || 'Gagal mengirim yapping.', 'error');
        console.error('Response:', result);
      }
    } catch (submissionError) {
      console.error('Error:', submissionError);
      showToastNotification('Terjadi kesalahan saat mengirim yapping Anda.', 'error');
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div>
      {/* Notifikasi Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50">
          <Toast className={`bg-slate-600 text-neutral-200 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <div className={`inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {toastType === 'success' ? '✔️' : '❌'}
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <button
              onClick={() => setToastMessage('')}
              className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8"
            >
              <span className="sr-only">Close</span>
              ✖️
            </button>
          </Toast>
        </div>
      )}

      <form className="text-white" onSubmit={handleSubmit}>
        {/* Input Foto */}
        <div className="mb-4">
          <label htmlFor="photo" className={`block mb-2 ${darkMode === "dark" ?  '' : ' text-black font-semibold'}`}>Photo/Video:</label>
          <input
            type="file"
            id="photo"
            accept="image/*,video/*"
            className={`p-4 rounded w-full focus:outline-none  ${darkMode === "dark" ? 'bg-neutral-800  ' : ' bg-slate-200 text-black'}`}
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Input Caption */}
        <div className="mb-4">
          <label htmlFor="caption"  className={`block mb-2 ${darkMode === "dark" ?  '' : ' text-black font-semibold'}`}>Caption:</label>
          <textarea
            id="caption"
            className={`p-4 rounded w-full focus:outline-none input-form-textarea ${darkMode === "dark" ? 'bg-neutral-800 file-dark ' : 'file-light bg-slate-200 text-black'}`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
            maxLength={400}
          />
          <p className="text-sm text-gray-400">{caption.length}/400</p>
        </div>

        {/* Input Lokasi */}
        <div className="mb-4">
          <label htmlFor="location"  className={`block mb-2 ${darkMode === "dark" ?  '' : ' text-black font-semibold'}`}>Location:</label>
          <input
            type="text"
            id="location"
            className={`p-4 rounded w-full focus:outline-none ${darkMode === "dark" ? 'bg-neutral-800 file-dark ' : 'file-light bg-slate-200 text-black'}`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            maxLength={70}
          />
          <p className="text-sm text-gray-400">{location.length}/70</p>
        </div>

        {/* Pilihan Publik */}
        <div className="mb-4">
          <label  className={`block mb-2 ${darkMode === "dark" ?  '' : ' text-black font-semibold'}`}>Public:</label>
          <select
            className={`p-4 rounded w-full focus:outline-none ${darkMode === "dark" ? 'bg-neutral-800 file-dark ' : 'file-light bg-slate-200 text-black'}`}
            value={isPublic}
            onChange={handlePublicChange}
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        {/* Tampilan Tag yang Dipilih */}
        <div className="mb-4">
          <label className={`block mb-2 ${darkMode === "dark" ?  '' : ' text-black font-semibold'}`}>Selected Tags:</label>
          <div className="flex flex-wrap">
            {selectedTags.map((tag) => (
              <div key={tag.id} className={`flex justify-between items-center mb-2 p-3 font-bold py-2 px-4 rounded w-full ${darkMode === "dark" ?  'bg-blue-600 hover:bg-blue-500 text-white ' : 'bg-gray-200 text-black font-semibold'}`}>
                {tag.name}
                <button
                  type="button"
                  className="ml-2 text-red-400"
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  ✖️
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">{selectedTags.length}/4</p>
        </div>

        {/* Pencarian dan Penambahan Tag */}
        <div className="mb-4">
          <label  className={`block mb-2 ${darkMode === "dark" ?  '' : ' text-black font-semibold'}`}>Search Tag:</label>
          <input
            type="text"
            className={`block mb-2 w-full ${darkMode === "dark" ?  '' : ' text-black font-semibold'}`}
            placeholder="Search Tags..."
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
          />
          {isLoading && <p className="text-gray-400">Loading</p>}
          {!isLoading && tagResults.length > 0 && (
            <div className="mt-2 rounded max-h-60 overflow-y-auto flex-col gap-2">
              {tagResults.map((tag) => (
                <div key={tag.id} className={`flex justify-between items-center mb-2 p-3 ${darkMode === "dark" ?  '' : 'bg-gray-200 text-black font-semibold'}`}>
                  <span>{tag.name}</span>
                  <button
                    type="button"
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAddTag(tag)}
                    disabled={selectedTags.length >= 4 || selectedTags.some((t) => t.id === tag.id)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full " 
          disabled={isLoadingSubmit}
        >
          {isLoadingSubmit ? 'Uploading' : 'Submit'}
        </button>

      </form>

      <div className="flex justify-end items-end mt-4">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className={`flex items-center mt-2 ${
            darkMode === "dark" ? "text-gray-300 hover:text-blue-400" : "text-neutral-700 hover:text-blue-600"
          }`}
        >
          <span className="mr-1 underline">Instruction</span>
          <span role="img" aria-label="info">❓</span>
        </button>
      </div>



      {/* Modal */}
      {isModalOpen && (
        <InstructionModal 
          onClose={() => setIsModalOpen(false)} 
          darkMode={darkMode} 
        />
      )}


      {/* LoadingPopup dihapus karena tidak digunakan */}
      <LoadingPopup isLoadingSubmit={isLoadingSubmit} />
    </div>
  );
};

export default YappingForm;



// import { useState, useEffect } from 'react';
// import { Toast } from 'flowbite-react';
// import './styles/YappingForm.css'
// import LoadingPopup from './atom/LoadingPopup';

// const YappingForm = () => {
//   const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
//   const [photo, setPhoto] = useState(null);
//   const [caption, setCaption] = useState('');
//   const [location, setLocation] = useState('');
//   const [isPublic, setIsPublic] = useState('1'); // Default to public
//   const [selectedTags, setSelectedTags] = useState([]); // Store selected tag objects {id, name}
//   const [tagSearch, setTagSearch] = useState('');
//   const [tagResults, setTagResults] = useState([]); // Store tag objects {id, name}
//   const [isLoading, setIsLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [showToast, setShowToast] = useState(false);
//   const [toastType, setToastType] = useState('success'); // Default to success

//   const handleFileChange = (e) => setPhoto(e.target.files[0]);

//   const handlePublicChange = (e) => setIsPublic(e.target.value);

//   // Fetch tag results based on search query with debounce
//   useEffect(() => {
//     if (tagSearch.trim() === '') {
//       setTagResults([]); // Clear results if search is empty
//       return;
//     }

//     const timer = setTimeout(async () => {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');

//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/search-reference?reference=${tagSearch}`, {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`, // Include the Bearer token
//             }
//           }
//         );
//         const data = await response.json();
//         if (data.status) setTagResults(data.data);
//       } catch (error) {
//         console.error('Error fetching tags:', error);
//       }

//       setIsLoading(false);
//     }, 500); // Delay search by 500ms

//     return () => clearTimeout(timer);
//   }, [tagSearch]);

//   // Handle adding tags (ensure maximum of 4 tags)
//   const handleAddTag = (tag) => {
//     if (selectedTags.length < 4 && !selectedTags.some(t => t.id === tag.id)) {
//       setSelectedTags([...selectedTags, tag]);
//     }
//   };

//   // Handle removing tags
//   const handleRemoveTag = (tagId) => {
//     setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
//   };

//   // Show toast notification
//   const showToastNotification = (message, type = 'success') => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     if (selectedTags.length !== 4) {
//       showToastNotification('Exactly 4 tags are required.', 'error');
//       return;
//     }

//     if (caption.length < 1 || caption.length > 400) {
//       showToastNotification('Caption must be between 1 and 400 characters.', 'error');
//       return;
//     }

//     if (location.length < 2 || location.length > 70) {
//       showToastNotification('Location must be between 2 and 70 characters.', 'error');
//       return;
//     }

//     // Prepare form data
//     const formData = new FormData();
//     formData.append('image', photo);
//     formData.append('caption', caption);
//     formData.append('location', location);
//     formData.append('is_public', isPublic);

//     selectedTags.forEach((tag, index) => {
//       formData.append(`tag_${index + 1}_id`, tag.id);
//       formData.append(`tag_${index + 1}_name`, tag.name);
//     });

//     setIsLoadingSubmit(true);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/my-yapping`, {
//         method: 'POST',
//         body: formData,
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const result = await response.json();
//       if (response.ok) {
//         showToastNotification('Yapping submitted successfully!');
//       } else {
//         showToastNotification(result.error, 'error');
//       }
//     } catch (error) {
//       showToastNotification('An error occurred during submission.', 'error');
//     } finally {
//       setIsLoadingSubmit(false);
//     }
//   };

//   return (
//     <div>
//       {/* Toast Notification */}
//       {toastMessage && (
//         <div className="fixed bottom-5 right-5 custom-toast">
//           <Toast className='bg-slate-600 text-neutral-200'>
//             <div className={`inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//               {toastType === 'success' ? '✔️' : '❌'}
//             </div>
//             <div className="ml-3 text-sm font-normal">{toastMessage}</div>
//             <button onClick={() => setToastMessage(null)} className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex h-8 w-8">
//               ✖️
//             </button>
//           </Toast>
//         </div>
//       )}

//       <form className="text-white" onSubmit={handleSubmit}>
//         {/* Photo Input */}
//         <div className="mb-4">
//           <label htmlFor="photo" className="block mb-2">Photo:</label>
//           <input type="file" id="photo" accept="image/*" className="bg-neutral-800 p-4 rounded w-full" onChange={handleFileChange} required />
//         </div>

//         {/* Caption Input */}
//         <div className="mb-4">
//           <label htmlFor="caption" className="block mb-2">Caption:</label>
//           <textarea id="caption" className="bg-neutral-800 p-2 rounded w-full" value={caption} onChange={(e) => setCaption(e.target.value)} required />
//         </div>

//         {/* Location Input */}
//         <div className="mb-4">
//           <label htmlFor="location" className="block mb-2">Location:</label>
//           <input type="text" id="location" className="bg-neutral-800 p-2 rounded w-full" value={location} onChange={(e) => setLocation(e.target.value)} required />
//         </div>

//         {/* Is Public */}
//         <div className="mb-4">
//           <label className="block mb-2">Is Public:</label>
//           <select className="bg-neutral-800 p-2 rounded w-full" value={isPublic} onChange={handlePublicChange}>
//             <option value="1">Yes</option>
//             <option value="0">No</option>
//           </select>
//         </div>

//         {/* Selected Tags Display */}
//         <div className="mb-4">
//           <label className="block mb-2">Selected Tags:</label>
//           <div className="flex flex-wrap">
//             {selectedTags.map((tag) => (
//               <div key={tag.id} className="bg-blue-500 text-white rounded p-2 m-1 flex items-center">
//                 {tag.name}
//                 <button className="ml-2 text-red-400" onClick={() => handleRemoveTag(tag.id)}>✖️</button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Search and Add Tags */}
//         <div className="mb-4">
//           <label className="block mb-2">Search Tags:</label>
//           <input type="text" className="bg-neutral-800 p-2 rounded w-full" placeholder="Search tags..." value={tagSearch} onChange={(e) => setTagSearch(e.target.value)} />
//           {isLoading && <p>Loading...</p>}
//           {!isLoading && tagResults.length > 0 && (
//             <div className="mt-2">
//               {tagResults.map((tag) => (
//                 <div key={tag.id} className="flex justify-between items-center">
//                   <span>{tag.name}</span>
//                   <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleAddTag(tag)} disabled={selectedTags.length >= 4}>
//                     Add
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button className="bg-blue-600 text-white p-2 rounded w-full" type="submit" disabled={isLoadingSubmit}>
//           {isLoadingSubmit ? 'Submitting...' : 'Submit Yapping'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default YappingForm;




// import { useState, useEffect } from 'react';
// import { Toast } from 'flowbite-react'; // Import Flowbite components
// import './styles/YappingForm.css'
// import LoadingPopup from './atom/LoadingPopup';

// const YappingForm = () => {

//   const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
//   const [photo, setPhoto] = useState(null);
//   const [caption, setCaption] = useState('');
//   const [location, setLocation] = useState('');
//   const [isPublic, setIsPublic] = useState('1'); // Default to public
//   const [selectedTags, setSelectedTags] = useState([]); // Store selected tag IDs
//   const [tagSearch, setTagSearch] = useState('');
//   const [tagResults, setTagResults] = useState([]); // Store tag objects {id, name}
//   const [isLoading, setIsLoading] = useState(false); // To show loading state
//   const [toastMessage, setToastMessage] = useState('');
//   // eslint-disable-next-line no-unused-vars
//   const [showToast, setShowToast] = useState(false);
//   const [toastType, setToastType] = useState('success'); // Default to success

//   const handleFileChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   const handlePublicChange = (e) => {
//     setIsPublic(e.target.value);
//   };

//   // Debounce tag search logic with 500ms delay
//   useEffect(() => {
//     if (tagSearch.trim() === '') {
//       setTagResults([]); // Clear results if search is empty
//       return;
//     }

//     const timer = setTimeout(async () => {
//       setIsLoading(true);

//       const token = localStorage.getItem('token');

//       try {
//         // Fetch tag results from the API
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/search-reference?reference=${tagSearch}`, {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`, // Include the Bearer token
//             }
//           }
//         );
//         const data = await response.json();

//         if (data.status) {
//           setTagResults(data.data); // Store the full result {id, name}
//         }
//       } catch (error) {
//         console.error('Error fetching tags:', error);
//       }
//       setIsLoading(false);
//     }, 500); // Delay search by 500ms

//     // Cleanup the timer if input changes before timeout
//     return () => clearTimeout(timer);
//   }, [tagSearch]);

//   // Handler for tag selection (limit to 4 tags)
//   const handleTagChange = (e) => {
//     const value = parseInt(e.target.value); // Convert value to number (id)
//     setSelectedTags((prevTags) =>
//       prevTags.includes(value)
//         ? prevTags.filter((tag) => tag !== value)
//         : [...prevTags, value].slice(0, 4) // Limit to 4 tags
//     );
//   };

//   // Show toast notification
//   const showToastNotification = (message, type = 'success') => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
    
//     setTimeout(() => {
//       setShowToast(false);
//     }, 3000); // Auto hide after 3 seconds
//   };

//   // Handler for form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Check for required fields
//     if (selectedTags.length < 1) {
//       showToastNotification('Please select at least one tag.', 'error');
//       return;
//     }
  
//     if (caption.length < 1 || caption.length > 400) {
//       showToastNotification('Caption must be between 1 and 400 characters.', 'error');
//       return;
//     }
  
//     if (location.length < 2 || location.length > 70) {
//       showToastNotification('Location must be between 2 and 70 characters.', 'error');
//       return;
//     }
  
//     // Create a new FormData object
//     const formData = new FormData();
//     formData.append('image', photo);
//     formData.append('caption', caption);
//     formData.append('location', location);
//     formData.append('is_public', isPublic);
  
//     // Map selected tags to formData
//     selectedTags.forEach((tagId, index) => {
//       const tag = tagResults.find(tag => tag.id === tagId);
//       if (tag) {
//         formData.append(`tag_${index + 1}_id`, tag.id);
//         formData.append(`tag_${index + 1}_name`, tag.name);
//       }
//     });
  
//     // Check for required tags
//     for (let i = 1; i <= 4; i++) {
//       if (!formData.get(`tag_${i}_id`)) {
//         if (i === 1) {
//           showToastNotification('At least one tag is required.', 'error');
//           return;
//         }
//       }
//     }
  
//     // Logging form data for debugging
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }

//     setIsLoadingSubmit(true);
  
//     // Send data to API
//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch(`${import.meta.env.VITE_API_URL}/my-yapping`, {
//         method: 'POST',import InstructionModal from './InstructionModal';


//         body: formData,
//         headers: {
//           'Authorization': `Bearer ${token}`, // Include the Bearer token
//         }
//       });
  
//       const result = await response.json();
  
//       if (response.ok) {
//         showToastNotification('Yapping submitted successfully!');
//       } else {
//         showToastNotification(result.error, 'error');
//         console.error('Response:', result);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       showToastNotification('An error occurred while submitting your yapping.', 'error');
//     } finally {
//         setIsLoadingSubmit(false);
//     }
//   };

//   return (
//     <div>
//       {/* Toast Notification */}
//       {toastMessage && (
//         <div className="fixed bottom-5 right-5 custom-toast">
//           <Toast className='bg-slate-600 text-neutral-200'>
//             <div className={`inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//               {toastType === 'success' ? '✔️' : '❌'}
//             </div>
//             <div className="ml-3 text-sm font-normal">
//               {toastMessage}
//             </div>
//             <button onClick={() => setToastMessage(null)} className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8">
//               <span className="sr-only">Close</span>
//               ✖️
//             </button>
//           </Toast>
//         </div>
//       )}


//       <form className="text-white" onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="photo" className="block mb-2">Photo:</label>
//           <input 
//             type="file" 
//             id="photo" 
//             accept="image/*"
//             className="bg-neutral-800 p-4 rounded w-full focus:outline-none"
//             onChange={handleFileChange}
//             required 
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="caption" className="block mb-2">Caption:</label>
//           <textarea 
//             id="caption" 
//             className="bg-neutral-800 p-2 rounded w-full focus:outline-none input-form-textarea"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="location" className="block mb-2">Location:</label>
//           <input 
//             type="text" 
//             id="location" 
//             className="bg-neutral-800 p-2 rounded w-full focus:outline-none"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Is Public:</label>
//           <select
//             className="bg-neutral-800 p-2 rounded w-full focus:outline-none"
//             value={isPublic}
//             onChange={handlePublicChange}
//           >
//             <option value="1">Yes</option>
//             <option value="0">No</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Search Tags:</label>
//           <input
//             type="text"
//             className="bg-neutral-800 p-2 rounded w-full focus:outline-none"
//             placeholder="Search tags..."
//             value={tagSearch}
//             onChange={(e) => setTagSearch(e.target.value)}
//           />
//           {isLoading && <p></p>}
//           {!isLoading && tagResults.length > 0 && (
//             <div className="mt-2">
//               {tagResults.map((tag) => (
//                 <div key={tag.id}>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       value={tag.id}
//                       checked={selectedTags.includes(tag.id)}
//                       onChange={handleTagChange}
//                       className="mr-2"
//                     />
//                     {tag.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <button 
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
//         >
//           Submit
//         </button>
//       </form>
//       <LoadingPopup isLoadingSubmit={isLoadingSubmit}/>
//     </div>
//   );
// };

// export default YappingForm;

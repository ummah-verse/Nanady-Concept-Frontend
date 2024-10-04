import { useState } from 'react'; 
import { Toast } from 'flowbite-react'; // Import Flowbite Toast
// import { HiX } from "react-icons/hi"; // Optional: Import icon for close button
import './styles/EditProfile.css'

const ReminderForm = () => {
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState('');
  const [startedDate, setStartedDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateObj = new Date(startedDate);
    const deadlineDateObj = new Date(deadlineDate);

    // Validation: Check if startedDate is greater than deadlineDate
    if (startDateObj > deadlineDateObj) {
      setToast({ message: 'Starting date cannot be later than deadline date !', type: 'error', visible: true });
      return;
    }

    if (startDateObj < new Date()) {
      setToast({ message: 'Starting date cannot be yesterday !', type: 'error', visible: true });
      return;
    }

    const formattedStartedDate = startDateObj.toISOString();
    const formattedDeadlineDate = deadlineDateObj.toISOString();
    const createdDate = new Date().toISOString();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('started_date', formattedStartedDate);
    formData.append('deadline_date', formattedDeadlineDate);
    formData.append('created_date', createdDate);
    formData.append('location', 'Office');
    formData.append('is_public', isPublic ? '1' : '0');

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/my-reminder`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setToast({ message: 'Reminder created successfully!', type: 'success', visible: true });

    } catch (error) {
      setToast({ message: error.message, type: 'error', visible: true });
    }
  };

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <div>
      {toast.visible && (
        <div className="fixed bottom-5 right-5 custom-toast">
          <Toast className="bg-slate-600 text-neutral-200 flex items-center p-4 rounded-lg shadow-md">
            <div className={`inline-flex h-8 w-8 p-2 items-center justify-center rounded-lg ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {toast.type === 'success' ? '✔️' : '❌'}
            </div>
            <div className="ml-3 text-sm font-normal">
              {toast.message}
            </div>
            <button onClick={closeToast} className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8">
              <span className="sr-only">Close</span>
              ✖️
            </button>
          </Toast>
        </div>
      )}


      <form className="text-white" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title:</label>
          <input 
            type="text" 
            id="title" 
            className="bg-neutral-800 p-2 w-full focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">Content:</label>
          <textarea 
            id="content" 
            className="bg-neutral-800 p-2 w-full focus:outline-none input-form-textarea" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startedDate" className="block mb-2">Started Date:</label>
          <input 
            type="datetime-local" 
            id="startedDate" 
            className="bg-neutral-800 p-2 w-full focus:outline-none"
            value={startedDate}
            onChange={(e) => setStartedDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="deadlineDate" className="block mb-2">Deadline Date:</label>
          <input 
            type="datetime-local" 
            id="deadlineDate" 
            className="bg-neutral-800 p-2 w-full focus:outline-none"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block mb-2">Location:</label>
          <input 
            type="text" 
            id="location" 
            className="bg-neutral-800 p-2 w-full focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isPublic" className="block mb-2">Public:</label>
          <input 
            type="checkbox" 
            id="isPublic" 
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </div>

        <button type="submit" className="w-full bg-slate-700 p-2 hover:bg-slate-600">Submit</button>
      </form>
    </div>
  );
};

export default ReminderForm;

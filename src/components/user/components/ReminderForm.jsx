import { useState } from 'react';

const ReminderForm = () => {
  // State untuk menyimpan data form
  const [content, setContent] = useState('');
  const [startedDate, setStartedDate] = useState('');
  const [finishedDate, setFinishedDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Membuat objek reminder baru
    const newReminder = {
      content,
      started_date: new Date(startedDate),
      finished_date: new Date(finishedDate),
      deadline_date: new Date(deadlineDate),
      created_date: new Date(),
      // user_id bisa diambil dari context atau props sesuai dengan user yang sedang login
    };

    console.log(newReminder);
    // Implementasikan logika untuk menyimpan reminder ke database atau API di sini
  };

  return (
    <form className="text-white" onSubmit={handleSubmit}>

       <div className="mb-4">
            <label htmlFor="startedDate" className="block mb-2">Title</label>
            <input 
            type="text" 
            id="startedDate" 
            className="bg-neutral-800 p-2 w-full focus:outline-none"
            // value={startedDate}
            // onChange={(e) => setStartedDate(e.target.value)}
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
        <label htmlFor="finishedDate" className="block mb-2">Finished Date:</label>
        <input 
          type="datetime-local" 
          id="finishedDate" 
          className="bg-neutral-800 p-2 w-full focus:outline-none"
          value={finishedDate}
          onChange={(e) => setFinishedDate(e.target.value)}
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
            <label htmlFor="startedDate" className="block mb-2">Location</label>
            <input 
            type="text" 
            id="startedDate" 
            className="bg-neutral-800 p-2 w-full focus:outline-none"
            // value={startedDate}
            // onChange={(e) => setStartedDate(e.target.value)}
            required
            />
      </div>

      <button type="submit" className="w-full bg-slate-700 p-2 hover:bg-slate-600">Submit</button>
    </form>
  );
};

export default ReminderForm;

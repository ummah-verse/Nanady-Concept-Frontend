import { useState } from 'react';

const YappingForm = () => {
  // State untuk menyimpan data form
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  // Handler untuk perubahan file
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Membuat objek data baru
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('caption', caption);
    formData.append('location', location);

    console.log({
      photo,
      caption,
      location,
    });

    // Implementasikan logika untuk menyimpan data ke server atau API di sini
    // Contoh: fetch('/api/upload', { method: 'POST', body: formData });
  };

  return (
    <form className="text-white" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="photo" className="block mb-2">Photo:</label>
        <input 
          type="file" 
          id="photo" 
          accept="image/*"
          className="bg-neutral-800 p-2 rounded w-full focus:outline-none"
          onChange={handleFileChange}
          required 
        />
      </div>

      <div className="mb-4">
        <label htmlFor="caption" className="block mb-2">Caption:</label>
        <textarea 
          id="caption" 
          className="bg-neutral-800 p-2 rounded w-full focus:outline-none input-form-textarea"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block mb-2">Location:</label>
        <input 
          type="text" 
          id="location" 
          className="bg-neutral-800 p-2 rounded w-full focus:outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="bg-slate-700 p-2 hover:bg-slate-600 w-full">Submit</button>
    </form>
  );
};

export default YappingForm;

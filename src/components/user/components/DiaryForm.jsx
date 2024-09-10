import { useState } from 'react';

const DiaryForm = () => {
  // State untuk menyimpan data form
  const [title, setTitle] = useState('');
  const [diary, setDiary] = useState('');
  const [charCount, setCharCount] = useState(0);

  // Handler untuk perubahan teks diary
  const handleDiaryChange = (e) => {
    const inputText = e.target.value;
    const charCount = inputText.length;

    // Cek apakah jumlah karakter sudah mencapai batas maksimal
    if (charCount <= 6000) {
      setDiary(inputText);
      setCharCount(charCount);
    }
  };

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Logika untuk mengirim data ke server atau API
    const formData = {
      title,
      diary,
    };

    console.log(formData);

    // Implementasikan logika untuk menyimpan data ke server atau API di sini
    // Contoh: fetch('/api/diary', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    <form className="text-white" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title:</label>
        <input 
          type="text" 
          id="title" 
          className="bg-neutral-800 p-2 rounded w-full focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="diary" className="block mb-2">Diary:</label>
        <textarea 
          id="diary" 
          className="bg-neutral-800 p-2 rounded w-full focus:outline-none input-form-textarea"
          value={diary}
          onChange={handleDiaryChange}
          required
        />
        <div className="text-gray-400 mt-2 text-sm">Character Count: {charCount}/6000</div>
      </div>

      <button type="submit" className="bg-slate-700 p-2 hover:bg-slate-600 w-full">Submit</button>
    </form>
  );
};

export default DiaryForm;

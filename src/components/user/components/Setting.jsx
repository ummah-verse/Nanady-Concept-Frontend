import { useState, useEffect } from 'react';

const Setting = () => {
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

  // Start with all categories shown by default (unchecked = visible)
  const [selectedCategories, setSelectedCategories] = useState({
    music: false,
    female: false,
    male: false,
    nonHijab: false,
    anime : false,
  });

//   console.log(selectedCategories)

  // Load data from Local Storage on component mount
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
    if (storedCategories) {
      setSelectedCategories(storedCategories);
    }
  }, []);

  // Save data to Local Storage whenever selectedCategories changes
  useEffect(() => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  const handleChange = (event) => {
    const { name } = event.target;
    setSelectedCategories((prev) => ({
      ...prev,
      [name]: !prev[name],  // Toggle the current visibility state
    }));
  };

  return (
    <div className={`w-full rounded overflow-hidden profile-card p-6 flex-col relative ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
      <div className={`font-semibold text-lg mb-2 ${darkMode === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
        Hide Content
      </div>

      <div>
        <form className="flex flex-col">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="music"
              checked={selectedCategories.music}
              onChange={handleChange}
              className="mr-2"
            />
            Music
          </label>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="female"
              checked={selectedCategories.female}
              onChange={handleChange}
              className="mr-2"
            />
            Female
          </label>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="male"
              checked={selectedCategories.male}
              onChange={handleChange}
              className="mr-2"
            />
            Male
          </label>
          {/* <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="nonHijab"
              checked={selectedCategories.nonHijab}
              onChange={handleChange}
              className="mr-2"
            />
            Non-Hijab
          </label>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="anime"
              checked={selectedCategories.anime}
              onChange={handleChange}
              className="mr-2"
            />
            Anime
          </label> */}
        </form>
      </div>
    </div>
  );
};

export default Setting;

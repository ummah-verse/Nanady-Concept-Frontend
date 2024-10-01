import { useState, useEffect } from 'react';

const YappingForm = () => {
  // State for storing form data
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isPublic, setIsPublic] = useState('1'); // Default to public
  const [selectedTags, setSelectedTags] = useState([]); // Store selected tag IDs

  // State for tag search and result
  const [tagSearch, setTagSearch] = useState('');
  const [tagResults, setTagResults] = useState([]); // Store tag objects {id, name}
  const [isLoading, setIsLoading] = useState(false); // To show loading state

  // Handler for file change
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Handler for public/private selection
  const handlePublicChange = (e) => {
    setIsPublic(e.target.value);
  };

  // Debounce tag search logic with 500ms delay
  useEffect(() => {
    if (tagSearch.trim() === '') {
      setTagResults([]); // Clear results if search is empty
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);

      const token = localStorage.getItem('token');

      try {
        // Fetch tag results from the API
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/search-reference?reference=${tagSearch}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Include the Bearer token
            }
          }
        );
        const data = await response.json();

        if (data.status) {
          setTagResults(data.data); // Store the full result {id, name}
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
      setIsLoading(false);
    }, 500); // Delay search by 500ms

    // Cleanup the timer if input changes before timeout
    return () => clearTimeout(timer);
  }, [tagSearch]);

  // Handler for tag selection (limit to 4 tags)
  const handleTagChange = (e) => {
    const value = parseInt(e.target.value); // Convert value to number (id)
    setSelectedTags((prevTags) =>
      prevTags.includes(value)
        ? prevTags.filter((tag) => tag !== value)
        : [...prevTags, value].slice(0, 4) // Limit to 4 tags
    );
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for required fields
    if (selectedTags.length < 1) {
      alert('Please select at least one tag.');
      return;
    }
  
    if (caption.length < 1 || caption.length > 400) {
      alert('Caption must be between 1 and 400 characters.');
      return;
    }
  
    if (location.length < 2 || location.length > 70) {
      alert('Location must be between 2 and 70 characters.');
      return;
    }
  
    // Create a new FormData object
    const formData = new FormData();
    formData.append('image', photo);
    formData.append('caption', caption);
    formData.append('location', location);
    formData.append('is_public', isPublic);
  
    // Map selected tags to formData
    selectedTags.forEach((tagId, index) => {
      const tag = tagResults.find(tag => tag.id === tagId);
      if (tag) {
        formData.append(`tag_${index + 1}_id`, tag.id);
        formData.append(`tag_${index + 1}_name`, tag.name);
      }
    });
  
    // Check for required tags
    for (let i = 1; i <= 4; i++) {
      if (!formData.get(`tag_${i}_id`)) {
        if (i === 1) {
          alert('At least one tag is required.');
          return;
        }
      }
    }
  
    // Logging form data for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    // Send data to API
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/my-yapping`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Bearer token
        }
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Yapping submitted successfully!');
      } else {
        alert("Image does not meat our policy");
        console.error('Response:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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

      <div className="mb-4">
        <label className="block mb-2">Is Public:</label>
        <select
          className="bg-neutral-800 p-2 rounded w-full focus:outline-none"
          value={isPublic}
          onChange={handlePublicChange}
        >
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Search Tags:</label>
        <input
          type="text"
          className="bg-neutral-800 p-2 rounded w-full focus:outline-none"
          placeholder="Search tags..."
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
        />
        {isLoading && <p>Loading...</p>}
        {!isLoading && tagResults.length > 0 && (
          <div className="mt-2">
            {tagResults.map((tag) => (
              <div key={tag.id}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onChange={handleTagChange}
                    className="mr-2"
                  />
                  {tag.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="bg-slate-700 p-2 hover:bg-slate-600 w-full">Submit</button>
    </form>
  );
};

export default YappingForm;

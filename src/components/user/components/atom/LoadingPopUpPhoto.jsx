import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const LoadingPopupPhoto = ({ isLoadingSubmit }) => {
  const [loadingText, setLoadingText] = useState("Processing...");

  useEffect(() => {
    if (!isLoadingSubmit) return;

    const texts = ["Processing...", "Analyzing Text...", "Analyzing Media...", "Waiting For Result..."];
    let counter = 0;

    const interval = setInterval(() => {
      // Set the loading text based on the current counter
      if (counter < texts.length) {
        setLoadingText(texts[counter]);
        counter++;
      }
    }, 1000);

    // Clear interval when loading stops or when the sequence is done
    return () => clearInterval(interval);
  }, [isLoadingSubmit]);

  if (!isLoadingSubmit) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
        </div>
        <p className="text-lg font-semibold">{loadingText}</p>
      </div>
    </div>
  );
};

// Define prop types
LoadingPopupPhoto.propTypes = {
  isLoadingSubmit: PropTypes.bool.isRequired, // isLoading should be a boolean and required
};

export default LoadingPopupPhoto;

import PropTypes from 'prop-types';

const InstructionModal = ({ onClose, darkMode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`p-5 w-11/12 max-w-lg mx-auto ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
        <h2 className="text-xl font-bold mb-4">Instruction for Posting Content</h2>
        <ul className="list-disc list-inside space-y-2">
         <li><span role="img" aria-label="warning">📌</span> Choose proper tag for your post.</li>
          <li><span role="img" aria-label="warning">⚠️</span> Avoid sharing sensitive information.</li>
          <li><span role="img" aria-label="fire">🔥</span> Be respectful and share positivity.</li>
          <li><span role="img" aria-label="check">✅</span> Ensure your content is accurate and truthful.</li>
          <li><span role="img" aria-label="stop">🚫</span> Refrain from posting offensive material.</li>
          <li><span role="img" aria-label="stop">🚀</span> Responsible with impact and consequences.</li>
        </ul>
        <button 
          onClick={onClose} 
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

InstructionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  darkMode: PropTypes.string.isRequired,
};

export default InstructionModal;

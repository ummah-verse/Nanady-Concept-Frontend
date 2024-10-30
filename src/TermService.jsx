import PropTypes from 'prop-types';

const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

const TermsAndService = ({ onAccept }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`p-6 rounded-lg shadow-lg text-center max-w-2xl w-full ${darkMode === "dark"
          ? 'bg-neutral-800 text-gray-300'
          : 'bg-white text-gray-900 border border-gray-200'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
        
        <div className="overflow-y-auto max-h-96 mb-4 px-4 text-left">
          <section className="mb-4">
            <h3 className="text-lg font-semibold">1. Introduction</h3>
            <p>Welcome to our application. By accessing or using our services, you agree to be bound by these terms and conditions...</p>
          </section>

          <section className="mb-4">
            <h3 className="text-lg font-semibold">2. User Responsibilities</h3>
            <p>Users are expected to maintain responsible behavior while using the application, avoiding any actions that could harm the service...</p>
          </section>

          <section className="mb-4">
            <h3 className="text-lg font-semibold">3. Privacy Policy</h3>
            <p>Your privacy is important to us. Please review our privacy policy to understand how we handle your personal information...</p>
          </section>

          <section className="mb-4">
            <h3 className="text-lg font-semibold">4. Changes to Terms</h3>
            <p>We reserve the right to modify these terms at any time. You are encouraged to review them periodically...</p>
          </section>
        </div>

        <button
          onClick={onAccept}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

TermsAndService.propTypes = {
  onAccept: PropTypes.func.isRequired, // Function to handle the accept action
  darkMode: PropTypes.string,          // "dark" for dark mode styling
};

export default TermsAndService;

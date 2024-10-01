import PropTypes from 'prop-types';

const Toast = ({ message, type, onClose }) => {
  const toastStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div className={`fixed bottom-5 right-5 mb-4 p-4 rounded shadow-lg text-white ${toastStyles[type]} transition-opacity duration-300 ease-in-out`}>
      <div className="flex justify-between items-center">
        <div>{message}</div>
        <button onClick={onClose} className="ml-2 text-lg">&times;</button>
      </div>
    </div>
  );
};

// Adding PropTypes
Toast.propTypes = {
  message: PropTypes.string.isRequired, // Required string for the message
  type: PropTypes.oneOf(['success', 'error']).isRequired, // Required string for type, limited to success or error
  onClose: PropTypes.func.isRequired, // Required function for closing the toast
};

export default Toast;

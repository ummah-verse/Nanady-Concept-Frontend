import { useState } from 'react';
import { Toast } from 'flowbite-react';
import { useNavigate, NavLink } from 'react-router-dom'; // Import useNavigate
import './styles/Login.css';
import { useTheme } from '../hooks/useTheme';
import TermsAndService from '../TermService';

const RegisterForm = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState(null); // State for Toast
  const [toastType, setToastType] = useState(''); // Success or Error type
  const navigate = useNavigate(); // Initialize useNavigate


  const { darkMode } = useTheme()

  const handleAcceptTerms = () => {
    setShowTerms(false);
    // Additional logic upon accepting terms (e.g., updating user consent in backend)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!name || !username || !email || !password) {
      setToastMessage('All fields are required.');
      setToastType('error'); // Set error Toast
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      // Check if the response is successful
      if (!response.ok) {
        const text = await response.text();
        let errorData;

        try {
          errorData = text ? JSON.parse(text) : {};
        } catch {
          errorData = { message: 'Registration failed. Please try again.' };
        }

        const message = errorData.error || errorData.message || 'Registration Failed';
        setToastMessage(message);
        setToastType('error'); // Error Toast
        return;
      }

      // Success
      setToastMessage('Registration successful!');
      setToastType('success'); // Success Toast

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 1000); // 1-second delay

    } catch (err) {
      console.error(err);
      setToastMessage('An error occurred. Please try again.');
      setToastType('error'); // Error Toast
    }
  };

  return (
<div>
  <div className='flex flex-col justify-center items-center text-center'>
    <h2 className={`text-4xl mb-4 font-bold ${darkMode === 'dark' ? 'text-white' : 'text-black'}`}>Sign Up :)</h2>
    <h4 className={`mb-6 ${darkMode === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}>to enjoy all of our cool features ✌️</h4>
  </div>

  <div className={` transition-colors duration-100 login-form ${ darkMode === 'dark' ? 'bg-neutral-800 text-white border-white border-4' : 'bg-slate-200 text-black border-neutral-950 border-4 shadow-xl'}`}>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
          className={`block w-full px-3 py-2 input-register rounded-md shadow-sm ${darkMode === 'dark' ? 'bg-neutral-700 text-white placeholder-gray-400' : 'bg-gray-100 text-black placeholder-gray-600'} focus:outline-none focus:ring-2 focus:ring-slate-500`}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          className={`block w-full px-3 py-2 input-register rounded-md shadow-sm ${darkMode === 'dark' ? 'bg-neutral-700 text-white placeholder-gray-400' : 'bg-gray-100 text-black placeholder-gray-600'} focus:outline-none focus:ring-2 focus:ring-slate-500`}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className={`block w-full px-3 py-2 input-register rounded-md shadow-sm ${darkMode === 'dark' ? 'bg-neutral-700 text-white placeholder-gray-400' : 'bg-gray-100 text-black placeholder-gray-600'} focus:outline-none focus:ring-2 focus:ring-slate-500`}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className={`block w-full px-3 py-2 input-register rounded-md shadow-sm ${darkMode === 'dark' ? 'bg-neutral-700 text-white placeholder-gray-400' : 'bg-gray-100 text-black placeholder-gray-600'} focus:outline-none focus:ring-2 focus:ring-slate-500`}
        />
      </div>

      <div className='form-group flex justify-end'>
        <a onClick={() => setShowTerms(true)} style={{ fontSize : '14px'}} className="inline-block text-blue-600 hover:cursor-pointer">
          Terms and Conditions
        </a>
      </div>

      <button type="submit" className="w-full px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
        Alright !
      </button>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          `p-3 ask-account hover:text-cyan-700 underline transition-colors duration-100 w-full text-center ${
            isActive
              ? darkMode === 'dark' 
                ? ' text-white hover:text-cyan-700'
                : ' hover:text-cyan-700'
              : darkMode === 'dark' 
                ? 'hover:text-cyan-500'
                : 'text-black hover:text-cyan-700'
          }`
        }
      >
        Already have an account?
      </NavLink>
    </form>



    {showTerms && (
        <TermsAndService
          onAccept={handleAcceptTerms}
          darkMode="light" // Or "dark" based on preference
        />
    )}

    {toastMessage && (
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
        <Toast className='bg-slate-600 text-neutral-200'>
          <div className={`inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {toastType === 'success' ? '✔️' : '❌'}
          </div>
          <div className="ml-3 text-sm font-normal">
            {toastMessage}
          </div>
          <button onClick={() => setToastMessage(null)} className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8">
            <span className="sr-only">Close</span>
            ✖️
          </button>
        </Toast>
      </div>
    )}
  </div>
</div>


  );
};

export default RegisterForm;

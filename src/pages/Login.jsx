import { useState } from 'react';
import { Toast } from 'flowbite-react';
import { useNavigate, NavLink } from 'react-router-dom';
import './styles/Login.css';
import { useTheme } from '../hooks/useTheme';

const LoginForm = () => {
  const { darkMode } = useTheme()

  console.log(darkMode)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState(null); // State untuk Toast
  const [toastType, setToastType] = useState(''); // Success atau Error
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setToastMessage('Email dan password diperlukan.');
      setToastType('error'); // Set Toast jadi error
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorData;

        try {
          errorData = text ? JSON.parse(text) : {};
        } catch {
          errorData = { message: 'Login gagal. Silakan coba lagi.' };
        }

        const message = errorData.error || errorData.message || 'Login gagal.';
        setToastMessage(message);
        setToastType('error'); // Toast untuk error

        return;
      }

      const data = await response.json();
      setToastMessage('Login Success!');
      setToastType('success'); // Toast untuk success
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('id', data.data.id);

      setTimeout(() => {
        navigate('/');
      }, 1000); // Delay sebelum redirect

    } catch (err) {
      console.error(err);
      setToastMessage('Terjadi kesalahan. Silakan coba lagi.');
      setToastType('error'); // Toast untuk error
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center text-center'>
        <h2 className={`text-4xl mb-4 font-bold ${darkMode === 'dark' ? 'text-white' : 'text-black'}`}>Sign in :)</h2>
        <h4 className={`mb-6 ${darkMode === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}>to enjoy all of our cool features ✌️</h4>
      </div>

          <div className={` transition-colors duration-100 login-form ${ darkMode === 'dark' ? 'bg-neutral-800 text-white border-white border-4' : 'bg-slate-200 text-black border-neutral-950 border-4 shadow-xl'}`}>

          
          <form onSubmit={handleSubmit} className="space-y-6 p-4">
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className={`block w-full px-3 py-2 input-login rounded-md shadow-sm focus:outline-none focus:ring-2 ${darkMode === 'dark' ? 'bg-neutral-700 text-white placeholder-gray-200 focus:ring-neutral-500' : 'bg-slate-100 text-black placeholder-gray-500 focus:ring-slate-500'}`}
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
                className={`block w-full px-3 py-2 input-login rounded-md shadow-sm focus:outline-none focus:ring-2 ${darkMode === 'dark' ? 'bg-neutral-700 text-white placeholder-gray-200 focus:ring-neutral-500' : 'bg-slate-100 text-black placeholder-gray-500 focus:ring-slate-500'}`}
              />
            </div>
            
            <button type="submit" className={`bg-slate-600 hover:bg-slate-700 focus:ring-slate-500' w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode === 'dark' ? 'bg-neutral-600 text-white hover:bg-neutral-700 focus:ring-neutral-500' : 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500'}`}>
              Alright !
            </button>
            
            <div className='w-full'>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `p-1 ask-account hover:text-cyan-700 underline transition-colors duration-100 w-full text-center ${
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
                {/* // eslint-disable-next-line react/no-unescaped-entities */}
                Dont have an account?
              </NavLink>
            </div>
          </form>

          {toastMessage && (
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
              <Toast className={`${darkMode === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-slate-600 text-neutral-200'}`}>
                <div className={`inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {toastType === 'success' ? '✔️' : '❌'}
                </div>
                <div className="ml-3 text-sm font-normal">
                  {toastMessage}
                </div>
                <button onClick={() => setToastMessage(null)} className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 focus:ring-2 ${darkMode === 'dark' ? 'text-gray-400 hover:text-gray-200 focus:ring-neutral-300' : 'text-gray-400 hover:text-gray-900 focus:ring-gray-300'}`}>
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

export default LoginForm;

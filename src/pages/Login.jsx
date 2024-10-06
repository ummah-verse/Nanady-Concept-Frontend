import { useState } from 'react';
import { Toast } from 'flowbite-react';
import { useNavigate, NavLink } from 'react-router-dom';
import './styles/Login.css';

const LoginForm = () => {
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
    <div className="login-form bg-neutral-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-white">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="block w-full px-3 py-2 input-login rounded-md shadow-sm bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
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
            className="block w-full px-3 py-2 input-login rounded-md shadow-sm bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
          Login
        </button>
        <div className='w-full'>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `p-3 ask-account transition-colors duration-300 ease-in-out ${
                isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'
              } w-full text-center`
            }
          >
            Dont have an account?
          </NavLink>
        </div>
      </form>

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
  );
};

export default LoginForm;

import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom'; // Import useNavigate
import './styles/Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset error message
    setError('');
  
    // Validasi sisi klien
    if (!email || !password) {
      setError('Email dan password diperlukan.');
      toast.error('Email dan password diperlukan.');
      return;
    }
  
    try {
      const response = await fetch(`https://bw2nj1xt-3500.asse.devtunnels.ms/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Cek apakah respons berhasil
      if (!response.ok) {
        const text = await response.text();
        let errorData;
  
        try {
          errorData = text ? JSON.parse(text) : {};
        } catch {
          errorData = { message: 'Login gagal. Silakan coba lagi.' };
        }
  
        setError(errorData.message || 'Login gagal.');
        toast.error(errorData.message || 'Login gagal.');
        return;
      }
  
      const data = await response.json();
      toast.success('Login berhasil!');
  
      // Simpan token di local storage
      localStorage.setItem('token', data.data.token);
      console.log('Login berhasil:', data);
  
      // Delay sebelum redirect ke homepage
      setTimeout(() => {
        navigate('/');
      }, 1000); // 1000 ms = 1 detik delay
  
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
          Login
        </button>
        <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `p-3 menu-profile transition-colors duration-300 ease-in-out ${
                        isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'
                      } w-full text-center`
                    }
                  >
                    Dont have an account?
                  </NavLink>    
      </form>
      <Toaster />
    </div>
  );
};

export default LoginForm;

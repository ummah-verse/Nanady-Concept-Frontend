import { useState } from 'react'; 
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom'; // Import useNavigate
import './styles/Login.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setError('');

    // Validasi sisi klien
    if (!name || !username || !email || !password) {
      setError('Semua bidang harus diisi.');
      toast.error('Semua bidang harus diisi.');
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

      // Cek apakah respons berhasil
      if (!response.ok) {
        const text = await response.text();
        let errorData;

        try {
          errorData = text ? JSON.parse(text) : {};
        } catch {
          errorData = { message: 'Pendaftaran gagal. Silakan coba lagi.' };
        }

        setError(errorData.message || 'Pendaftaran gagal.');
        toast.error(errorData.message || 'Pendaftaran gagal.');
        return;
      }

    //   const data = await response.json();
      toast.success('Pendaftaran berhasil!');

      // Redirect ke halaman login setelah berhasil mendaftar
      setTimeout(() => {
        navigate('/login');
      }, 1000); // 1000 ms = 1 detik delay

    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <div className="register-form bg-neutral-800 rounded-lg shadow-lg p-8 px-10">
      <h2 className="text-2xl font-semibold mb-6 text-white">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nama"
            className="block w-full px-3 py-2 input-register rounded-md shadow-sm bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
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
            className="block w-full px-3 py-2 input-register rounded-md shadow-sm bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
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
            className="block w-full px-3 py-2 input-register rounded-md shadow-sm bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
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
            className="block w-full px-3 py-2 input-register rounded-md shadow-sm bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
          Register
        </button>
             <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `p-3 menu-profile transition-colors duration-300 ease-in-out ${
                        isActive ? 'hover:bg-neutral-700' : 'text-white hover:bg-neutral-700'
                      } w-full text-center`
                    }
                  >
                    Already have an account?
                  </NavLink>      
            </form>
      <Toaster />
    </div>
  );
};

export default RegisterForm;

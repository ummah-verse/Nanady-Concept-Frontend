import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import './styles/Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error message
    setError('');

    // Basic client-side validation
    if (!email || !password) {
      setError('Email and password are required.');
      toast.error('Email and password are required.');
      return;
    }

    // Example POST request to login API
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });


      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        // Handle successful login (e.g., redirect, store token)
        console.log('Login successful:', data);
      } else {
        setError(data.message || 'Login failed.');
        toast.error(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.', err);
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
      </form>
      <Toaster />
    </div>
  );
};

export default LoginForm;

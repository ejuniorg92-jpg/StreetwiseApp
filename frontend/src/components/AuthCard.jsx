// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';
import { login, register, logout, auth } from '../services/auth';
import { onAuthStateChanged } from 'firebase/auth';

export default function AuthCard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') await login(email, password);
      else await register(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      alert('Auth error: ' + err.message);
    }
  };

  if (user) {
    return (
      <div className="p-4 bg-blue-900 text-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Welcome, {user.email}</h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-800 text-white rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold mb-2">
        {mode === 'login' ? 'Sign In' : 'Register'}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block mb-2 p-2 rounded text-black w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block mb-2 p-2 rounded text-black w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded w-full"
      >
        {mode === 'login' ? 'Sign In' : 'Register'}
      </button>
      <p
        className="mt-2 text-sm cursor-pointer underline"
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
      >
        {mode === 'login'
          ? 'Need an account? Register'
          : 'Have an account? Sign In'}
      </p>
    </form>
  );
}







'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('admin_token', data.token);
      router.push('/admin/dashboard');
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-6">
      <div className="w-full max-w-[420px] p-12 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
        <div className="text-center mb-10">
          <h1 className="font-forum text-3xl text-off-white tracking-[4px] mb-2 uppercase">
            QITCHEN
          </h1>
          <p className="font-sans text-[13px] text-[#666] tracking-[1px] uppercase">
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="font-sans text-[12px] text-[#666] tracking-[1px] block mb-1.5 uppercase">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm outline-none focus:border-white transition-colors"
            />
          </div>
          <div>
            <label className="font-sans text-[12px] text-[#666] tracking-[1px] block mb-1.5 uppercase">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm outline-none focus:border-white transition-colors"
            />
          </div>

          {error && (
            <p className="text-[#ff6b6b] text-[13px] font-sans text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-3.5 border-none bg-off-white text-[var(--bg-primary)] font-sans text-[13px] font-semibold tracking-[2px] rounded-lg transition-all
              ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-white active:scale-[0.98]'}`}
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}

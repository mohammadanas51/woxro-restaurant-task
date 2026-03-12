'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm outline-none focus:border-white transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.046m4.579-4.581A10.047 10.047 0 0112 4.5c4.478 0 8.268 2.943 9.542 7a10.017 10.017 0 01-1.13 2.503m-3.131 3.131a3 3 0 11-4.243-4.243M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
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

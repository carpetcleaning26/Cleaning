'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b132b] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#070d1e] border border-sky-900 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-900/60 text-[#10b981] flex items-center justify-center mx-auto border border-sky-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Canberra Cleaners Admin</h1>
          <p className="text-xs text-sky-200 font-medium">Sign in to manage quote requests, services & content.</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-sky-200 uppercase tracking-wider">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@canberracarpetcleaningdeals.com.au"
                className="w-full bg-[#0b132b] border border-sky-700 rounded-xl pl-10 pr-4 py-3 text-white text-xs placeholder-sky-500 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-sky-200 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0b132b] border border-sky-700 rounded-xl pl-10 pr-4 py-3 text-white text-xs placeholder-sky-500 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-sky-400 font-semibold border-t border-sky-900/60 pt-4">
          Canberra Carpet Cleaning Deals • Protected Portal
        </div>

      </div>
    </div>
  );
}

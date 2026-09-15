'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function ActivatePage({
  params,
}: {
  params: { id: string; token: string };
}) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Reconstruct the original Shopify activation URL format
      const activationUrl = `https://rangbareilly.myshopify.com/account/activate/${params.id}/${params.token}`;

      const res = await fetch('/api/auth/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activationUrl, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to activate account');
      }

      router.push('/account');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rangbareilly-background px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-rose-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 font-caveat text-3xl font-bold">
            RB
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2 font-outfit">
          Activate Account
        </h1>
        <p className="text-center text-gray-600 mb-8 font-outfit text-sm">
          Please create a password to activate your account.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleActivate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Create Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Activating...' : 'ACTIVATE ACCOUNT'}
          </button>
        </form>
      </div>
    </div>
  );
}

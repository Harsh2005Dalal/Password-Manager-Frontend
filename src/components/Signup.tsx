import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

interface SignupProps {
  onSwitchToLogin: () => void;
}

export default function Signup({ onSwitchToLogin }: SignupProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(username, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-black !text-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center mb-8">
          Sign Up Krle, Aalu
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium  mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              minLength={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

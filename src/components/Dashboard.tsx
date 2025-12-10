import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { passwordAPI } from '../services/api';
import { LogOut, Plus, Search } from 'lucide-react';
import PasswordCard from './PasswordCard';
import PasswordModal from './PasswordModal';

interface Password {
  _id: string;
  websiteName: string;
  websiteUrl: string;
  websiteUsername: string;
  websitePassword: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [filteredPasswords, setFilteredPasswords] = useState<Password[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState<Password | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPasswords();
  }, []);

  useEffect(() => {
    const filtered = passwords.filter(
      (pwd) =>
        pwd.websiteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pwd.websiteUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pwd.websiteUsername.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPasswords(filtered);
  }, [searchQuery, passwords]);

  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const data = await passwordAPI.getAll();
      setPasswords(data);
      setFilteredPasswords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch passwords');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = () => {
    setEditingPassword(null);
    setIsModalOpen(true);
  };

  const handleEditPassword = (password: Password) => {
    setEditingPassword(password);
    setIsModalOpen(true);
  };

  const handleDeletePassword = async (id: string) => {
    if (!confirm('Are you sure you want to delete this password?')) return;

    try {
      await passwordAPI.delete(id);
      setPasswords(passwords.filter((p) => p._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete password');
    }
  };

  const handleSavePassword = async (data: Omit<Password, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingPassword) {
        const updated = await passwordAPI.update(editingPassword._id, data);
        setPasswords(passwords.map((p) => (p._id === editingPassword._id ? updated : p)));
      } else {
        const newPassword = await passwordAPI.create(data);
        setPasswords([newPassword, ...passwords]);
      }
      setIsModalOpen(false);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Password Manager</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.username}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search passwords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAddPassword}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Password
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading passwords...</p>
          </div>
        ) : filteredPasswords.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchQuery
                ? 'No passwords found matching your search'
                : 'No passwords saved yet. Click "Add Password" to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPasswords.map((password) => (
              <PasswordCard
                key={password._id}
                password={password}
                onEdit={() => handleEditPassword(password)}
                onDelete={() => handleDeletePassword(password._id)}
              />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <PasswordModal
          password={editingPassword}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePassword}
        />
      )}
    </div>
  );
}

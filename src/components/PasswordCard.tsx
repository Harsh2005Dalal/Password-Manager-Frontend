import { useState } from 'react';
import { Eye, EyeOff, Edit2, Trash2, ExternalLink, Copy, Check } from 'lucide-react';

interface Password {
  _id: string;
  websiteName: string;
  websiteUrl: string;
  websiteUsername: string;
  websitePassword: string;
  createdAt: string;
  updatedAt: string;
}

interface PasswordCardProps {
  password: Password;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PasswordCard({ password, onEdit, onDelete }: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {password.websiteName}
          </h3>
          <a
            href={password.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            {password.websiteUrl}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Username</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900 flex-1 truncate">
              {password.websiteUsername}
            </span>
            <button
              onClick={() => copyToClipboard(password.websiteUsername, 'username')}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              {copiedField === 'username' ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Password</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900 flex-1 font-mono">
              {showPassword ? password.websitePassword : '••••••••'}
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-600" />
              ) : (
                <Eye className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => copyToClipboard(password.websitePassword, 'password')}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              {copiedField === 'password' ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(password.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

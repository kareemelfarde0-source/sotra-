import React, { useState } from 'react';
import { X, Lock, Shield, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isArabic: boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isArabic
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Primary Credentials Check (admin / SOTRA20260)
    if (username.trim() === 'admin' && password === 'SOTRA20260') {
      try {
        localStorage.setItem('sotra_admin_auth', 'true');
      } catch (err) {
        console.error('Storage error', err);
      }
      onSuccess();
      setUsername('');
      setPassword('');
    } else {
      setError(
        isArabic
          ? 'اسم المستخدم أو كلمة المرور غير صحيحة'
          : 'Invalid username or password'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-700 text-white rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-wider uppercase">
                {isArabic ? 'لوحة التحكم والإدارة' : 'Administration Panel'}
              </h3>
              <span className="text-[10px] text-neutral-400 font-mono block">
                SOTRA Fashion Admin
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded flex items-center space-x-2 rtl:space-x-reverse">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Input - strictly without hint or placeholder */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              {isArabic ? 'اسم المستخدم' : 'Username'}
            </label>
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded text-sm text-white focus:outline-none focus:border-white transition font-medium"
            />
          </div>

          {/* Password Input - strictly without hint or placeholder */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              {isArabic ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded text-sm text-white focus:outline-none focus:border-white transition font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-white hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-widest rounded transition flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer shadow-lg"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isArabic ? 'تسجيل الدخول' : 'Sign In'}</span>
              {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

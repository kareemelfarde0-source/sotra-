import React, { useState } from 'react';
import { Shield, Key, UserCheck, Lock, CheckCircle2, UserPlus, Eye, EyeOff } from 'lucide-react';
import { AdminUser, AdminRole } from '../../types';
import { getAdminUsers, saveAdminUsers } from '../../utils/adminAuth';

interface AdminUsersTabProps {
  isArabic: boolean;
  onNotify: (msg: string) => void;
}

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({ isArabic, onNotify }) => {
  const [users, setUsers] = useState<AdminUser[]>(getAdminUsers);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const toggleShowPassword = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdatePassword = (userId: string) => {
    if (!newPassword.trim()) {
      alert(isArabic ? 'يرجى إدخال كلمة مرور جديدة' : 'Please enter a new password');
      return;
    }

    const updated = users.map((u) => {
      if (u.id === userId) {
        return { ...u, password: newPassword.trim() };
      }
      return u;
    });

    setUsers(updated);
    saveAdminUsers(updated);
    setEditingUserId(null);
    setNewPassword('');
    onNotify(isArabic ? 'تم تحديث كلمة المرور بنجاح' : 'Password updated successfully');
  };

  const getRoleLabel = (role: AdminRole) => {
    switch (role) {
      case 'admin':
        return isArabic ? 'المدير العام (كافة الصلاحيات والإعدادات)' : 'Super Administrator (Full Access)';
      case 'orders':
        return isArabic ? 'مسؤول الطلبات (إدارة الطلبات والشحن والعملاء)' : 'Orders & Shipping Manager';
      case 'data_entry':
        return isArabic ? 'مدخل بيانات (إضافة وتعديل المنتجات والأقسام)' : 'Data Entry Specialist';
      case 'management':
        return isArabic ? 'إدارة العمليات (الطلبات، المنتجات، العملاء)' : 'Operations Manager';
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6 shadow-xs">
        <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-neutral-100 pb-3 mb-4">
          <Shield className="w-5 h-5 text-neutral-800" />
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              {isArabic ? 'حسابات الدخول وتعيين الصلاحيات' : 'User Accounts & Role Permissions'}
            </h3>
            <p className="text-[11px] text-neutral-500">
              {isArabic
                ? 'يظهر لكل حساب فقط الشاشات المسموح له بالوصول إليها وفق صلاحيته.'
                : 'Each user is granted visibility only to their permitted tabs and operations.'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {users.map((user) => {
            const isEditing = editingUserId === user.id;
            const isShown = !!showPassword[user.id];

            return (
              <div
                key={user.id}
                className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="font-bold text-xs text-neutral-900">
                      {isArabic ? user.nameAr : user.nameEn}
                    </span>
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded">
                      {user.role}
                    </span>
                    {user.username === 'admin' && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                        {isArabic ? 'الحساب الأساسي' : 'Primary'}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-600 flex items-center space-x-3 rtl:space-x-reverse">
                    <span>
                      {isArabic ? 'اسم المستخدم:' : 'Username:'}{' '}
                      <strong className="text-neutral-900 font-mono">{user.username}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      {isArabic ? 'كلمة المرور الحالية:' : 'Current Password:'}{' '}
                      <strong className="text-neutral-900 font-mono">
                        {isShown ? user.password : '••••••••'}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleShowPassword(user.id)}
                      className="text-neutral-500 hover:text-black transition"
                    >
                      {isShown ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500">{getRoleLabel(user.role)}</p>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse shrink-0">
                  {isEditing ? (
                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                      <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={isArabic ? 'كلمة المرور الجديدة' : 'New password'}
                        className="p-1.5 bg-white border border-neutral-300 rounded text-xs font-mono w-36"
                      />
                      <button
                        onClick={() => handleUpdatePassword(user.id)}
                        className="px-2.5 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded cursor-pointer"
                      >
                        {isArabic ? 'حفظ' : 'Save'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingUserId(null);
                          setNewPassword('');
                        }}
                        className="px-2.5 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold rounded cursor-pointer"
                      >
                        {isArabic ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingUserId(user.id);
                        setNewPassword(user.password);
                      }}
                      className="px-3 py-1.5 bg-white border border-neutral-300 hover:border-black text-xs font-bold rounded text-neutral-800 transition cursor-pointer flex items-center space-x-1.5 rtl:space-x-reverse"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>{isArabic ? 'تغيير كلمة المرور' : 'Change Password'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

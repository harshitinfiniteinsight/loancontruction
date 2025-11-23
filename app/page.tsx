'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/lib/mockData';
import { UserRole } from '@/lib/types';

export default function Home() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleLogin = (role: UserRole) => {
    // Store role in localStorage for demo purposes
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', mockUsers.find(u => u.role === role)?.id || '');
    router.push(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Construction Loan Admin
          </h1>
          <p className="text-gray-600">MVP Prototype - Select Role to Login</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('builder')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Builder Portal
          </button>
          <button
            onClick={() => handleLogin('lender')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Lender Dashboard
          </button>
          <button
            onClick={() => handleLogin('admin')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Admin Dashboard
          </button>
          <button
            onClick={() => handleLogin('fund_admin')}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Fund Admin Portal
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            This is a clickable prototype with dummy data
          </p>
        </div>
      </div>
    </div>
  );
}


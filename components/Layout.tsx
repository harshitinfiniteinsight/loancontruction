'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, LogOut, Building2, FileText, DollarSign, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: string;
  title: string;
}

export default function Layout({ children, role, title }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    router.push('/');
  };

  const getNavItems = () => {
    switch (role) {
      case 'builder':
        return [
          { href: `/dashboard/builder`, label: 'My Jobs', icon: Building2 },
          { href: `/dashboard/builder/draws`, label: 'Draw Requests', icon: FileText },
          { href: `/dashboard/builder/documents`, label: 'Documents', icon: FileText },
        ];
      case 'lender':
        return [
          { href: `/dashboard/lender`, label: 'Loans', icon: Building2 },
          { href: `/dashboard/lender/draws`, label: 'Draw Reviews', icon: FileText },
        ];
      case 'admin':
        return [
          { href: `/dashboard/admin`, label: 'Loan List', icon: Building2 },
          { href: `/dashboard/admin/budgets`, label: 'Budgets', icon: DollarSign },
          { href: `/dashboard/admin/draws`, label: 'Draw Worksheet', icon: FileText },
          { href: `/dashboard/admin/documents`, label: 'Documents', icon: FileText },
        ];
      case 'fund_admin':
        return [
          { href: `/dashboard/fund_admin`, label: 'Warehouse Lines', icon: DollarSign },
          { href: `/dashboard/fund_admin/funding`, label: 'Funding Events', icon: DollarSign },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}


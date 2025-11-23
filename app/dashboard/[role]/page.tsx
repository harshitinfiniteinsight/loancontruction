'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockLoans, mockDraws, getUserByRole } from '@/lib/mockData';
import { Loan, Draw } from '@/lib/types';
import { Building2, DollarSign, FileText, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;
  const [loans, setLoans] = useState<Loan[]>([]);
  const [draws, setDraws] = useState<Draw[]>([]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole || storedRole !== role) {
      router.push('/');
      return;
    }

    if (role === 'builder') {
      const userId = localStorage.getItem('userId');
      const builderLoans = mockLoans.filter(loan => loan.builderId === userId);
      setLoans(builderLoans);
      setDraws(mockDraws.filter(draw => builderLoans.some(loan => loan.id === draw.loanId)));
    } else if (role === 'lender' || role === 'admin') {
      setLoans(mockLoans);
      setDraws(mockDraws);
    }
  }, [role, router]);

  const getTitle = () => {
    switch (role) {
      case 'builder': return 'Builder Portal';
      case 'lender': return 'Lender Dashboard';
      case 'admin': return 'Admin Dashboard';
      case 'fund_admin': return 'Fund Admin Portal';
      default: return 'Dashboard';
    }
  };

  const getStats = () => {
    if (role === 'builder') {
      const totalLoans = loans.length;
      const activeDraws = draws.filter(d => d.status === 'submitted' || d.status === 'under_review').length;
      const totalRequested = draws.reduce((sum, d) => sum + d.totalRequested, 0);
      const totalFunded = draws.filter(d => d.status === 'funded').reduce((sum, d) => sum + (d.totalApproved || 0), 0);
      
      return [
        { label: 'Active Jobs', value: totalLoans, icon: Building2, color: 'blue' },
        { label: 'Pending Draws', value: activeDraws, icon: Clock, color: 'yellow' },
        { label: 'Total Requested', value: `$${totalRequested.toLocaleString()}`, icon: DollarSign, color: 'green' },
        { label: 'Total Funded', value: `$${totalFunded.toLocaleString()}`, icon: TrendingUp, color: 'purple' },
      ];
    } else if (role === 'lender' || role === 'admin') {
      const totalLoans = loans.length;
      const pendingDraws = draws.filter(d => d.status === 'submitted' || d.status === 'under_review').length;
      const totalLoanAmount = loans.reduce((sum, l) => sum + l.loanAmount, 0);
      const totalOutstanding = loans.reduce((sum, l) => sum + l.currentBalance, 0);
      
      return [
        { label: 'Total Loans', value: totalLoans, icon: Building2, color: 'blue' },
        { label: 'Pending Reviews', value: pendingDraws, icon: FileText, color: 'yellow' },
        { label: 'Total Loan Amount', value: `$${totalLoanAmount.toLocaleString()}`, icon: DollarSign, color: 'green' },
        { label: 'Outstanding Balance', value: `$${totalOutstanding.toLocaleString()}`, icon: TrendingUp, color: 'purple' },
      ];
    }
    return [];
  };

  const stats = getStats();

  return (
    <Layout role={role} title={getTitle()}>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Overview</h2>
          <p className="text-gray-600">Welcome to your dashboard</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-500',
              green: 'bg-green-500',
              yellow: 'bg-yellow-500',
              purple: 'bg-purple-500',
            };
            return (
              <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-md p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                        <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {role === 'builder' ? 'My Active Jobs' : 'Active Loans'}
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {loans.map((loan) => (
              <li key={loan.id}>
                <Link href={`/dashboard/${role}/loans/${loan.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Building2 className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {loan.loanNumber} - {loan.borrowerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {loan.propertyAddress}, {loan.city}, {loan.state}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${loan.loanAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {loan.progress}% Complete
                          </div>
                        </div>
                        <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          loan.status === 'active' ? 'bg-green-100 text-green-800' :
                          loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {loan.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}


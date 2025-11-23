'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockDraws, mockLoans } from '@/lib/mockData';
import { Draw } from '@/lib/types';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function BuilderDrawsPage() {
  const router = useRouter();
  const [draws, setDraws] = useState<Draw[]>([]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole || storedRole !== 'builder') {
      router.push('/');
      return;
    }

    const userId = localStorage.getItem('userId');
    const builderLoans = mockLoans.filter(loan => loan.builderId === userId);
    const builderDraws = mockDraws.filter(draw => builderLoans.some(loan => loan.id === draw.loanId));
    setDraws(builderDraws);
  }, [router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'funded':
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'under_review':
      case 'submitted':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getLoanNumber = (loanId: string) => {
    const loan = mockLoans.find(l => l.id === loanId);
    return loan?.loanNumber || 'N/A';
  };

  return (
    <Layout role="builder" title="Builder Portal">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Draw Requests</h2>
            <p className="text-gray-600 mt-1">Manage and track your draw requests</p>
          </div>
          <Link
            href="/dashboard/builder/draws/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            New Draw Request
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {draws.map((draw) => (
              <li key={draw.id}>
                <Link href={`/dashboard/builder/draws/${draw.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(draw.status)}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Draw #{draw.drawNumber} - {getLoanNumber(draw.loanId)}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Requested: {draw.requestedDate} • ${draw.totalRequested.toLocaleString()}
                            {draw.totalApproved && ` • Approved: $${draw.totalApproved.toLocaleString()}`}
                          </div>
                          {draw.lineItems.length > 0 && (
                            <div className="text-xs text-gray-400 mt-1">
                              {draw.lineItems.length} line item{draw.lineItems.length > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          draw.status === 'funded' ? 'bg-green-100 text-green-800' :
                          draw.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                          draw.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                          draw.status === 'submitted' ? 'bg-purple-100 text-purple-800' :
                          draw.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {draw.status.replace('_', ' ').toUpperCase()}
                        </span>
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


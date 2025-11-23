'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockDraws, mockLoans } from '@/lib/mockData';
import { Draw } from '@/lib/types';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function LenderDrawsPage() {
  const router = useRouter();
  const [draws, setDraws] = useState<Draw[]>([]);
  const [filter, setFilter] = useState<string>('pending');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole || storedRole !== 'lender') {
      router.push('/');
      return;
    }

    let filteredDraws = mockDraws;
    if (filter === 'pending') {
      filteredDraws = mockDraws.filter(d => d.status === 'submitted' || d.status === 'under_review');
    }
    setDraws(filteredDraws);
  }, [router, filter]);

  const getLoanNumber = (loanId: string) => {
    const loan = mockLoans.find(l => l.id === loanId);
    return loan?.loanNumber || 'N/A';
  };

  return (
    <Layout role="lender" title="Lender Dashboard">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Draw Reviews</h2>
          <p className="text-gray-600 mt-1">Review and approve draw requests</p>
        </div>

        <div className="mb-4 flex space-x-2">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Pending Review
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Draws
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {draws.map((draw) => (
              <li key={draw.id}>
                <Link href={`/dashboard/lender/draws/${draw.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {(draw.status === 'submitted' || draw.status === 'under_review') && (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                        {draw.status === 'approved' && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {draw.status === 'rejected' && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Draw #{draw.drawNumber} - {getLoanNumber(draw.loanId)}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Requested: {draw.requestedDate} by {draw.requestedBy}
                          </div>
                          <div className="text-sm text-gray-900 mt-1 font-semibold">
                            ${draw.totalRequested.toLocaleString()}
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
                          'bg-gray-100 text-gray-800'
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


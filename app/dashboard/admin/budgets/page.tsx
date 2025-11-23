'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockBudgets, mockLoans } from '@/lib/mockData';
import { Budget } from '@/lib/types';
import Link from 'next/link';
import { DollarSign, Upload } from 'lucide-react';

export default function AdminBudgetsPage() {
  const router = useRouter();
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole || storedRole !== 'admin') {
      router.push('/');
      return;
    }

    setBudgets(mockBudgets);
  }, [router]);

  const getLoanNumber = (loanId: string) => {
    const loan = mockLoans.find(l => l.id === loanId);
    return loan?.loanNumber || 'N/A';
  };

  return (
    <Layout role="admin" title="Admin Dashboard">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Budget Management</h2>
            <p className="text-gray-600 mt-1">Import and manage construction budgets</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Import Budget
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {budgets.map((budget) => (
              <li key={budget.id}>
                <Link href={`/dashboard/admin/budgets/${budget.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <DollarSign className="h-8 w-8 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {getLoanNumber(budget.loanId)} - Budget v{budget.version}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Total: ${budget.totalBudget.toLocaleString()} • {budget.lines.length} line items
                          </div>
                          <div className="text-sm text-gray-500">
                            Updated: {budget.updatedAt}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          ${budget.totalBudget.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Total Budget</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Budget Import Process</h3>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>Select loan for budget import</li>
            <li>Upload Excel file with budget line items</li>
            <li>Map columns to budget fields (category, description, amount)</li>
            <li>Review and validate budget totals</li>
            <li>Approve and activate budget</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}


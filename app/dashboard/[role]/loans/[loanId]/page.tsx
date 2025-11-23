'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { getLoanById, getBudgetByLoanId, getDrawsByLoanId } from '@/lib/mockData';
import { Loan, Budget, Draw } from '@/lib/types';
import { Building2, DollarSign, Calendar, TrendingUp, FileText } from 'lucide-react';
import Link from 'next/link';

export default function LoanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;
  const loanId = params.loanId as string;
  const [loan, setLoan] = useState<Loan | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [draws, setDraws] = useState<Draw[]>([]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole || storedRole !== role) {
      router.push('/');
      return;
    }

    const loanData = getLoanById(loanId);
    if (loanData) {
      setLoan(loanData);
      setBudget(getBudgetByLoanId(loanId));
      setDraws(getDrawsByLoanId(loanId));
    }
  }, [loanId, role, router]);

  if (!loan) {
    return (
      <Layout role={role} title="Loan Details">
        <div className="text-center py-12">Loading...</div>
      </Layout>
    );
  }

  const getTitle = () => {
    switch (role) {
      case 'builder': return 'Builder Portal';
      case 'lender': return 'Lender Dashboard';
      case 'admin': return 'Admin Dashboard';
      default: return 'Dashboard';
    }
  };

  return (
    <Layout role={role} title={getTitle()}>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <Link href={`/dashboard/${role}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to {role === 'builder' ? 'Jobs' : 'Loans'}
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Loan Information</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Loan Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.loanNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Borrower</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.borrowerName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Property Address</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {loan.propertyAddress}, {loan.city}, {loan.state} {loan.zipCode}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Builder</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.builderName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Loan Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">${loan.loanAmount.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Balance</dt>
                <dd className="mt-1 text-sm text-gray-900">${loan.currentBalance.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.startDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Expected Completion</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.expectedCompletionDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Phase</dt>
                <dd className="mt-1 text-sm text-gray-900">{loan.currentPhase}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Progress</dt>
                <dd className="mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${loan.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-900">{loan.progress}%</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {budget && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Budget Summary</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Total Budget</span>
                  <span className="font-semibold">${budget.totalBudget.toLocaleString()}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budgeted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Complete</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {budget.lines.map((line) => (
                      <tr key={line.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{line.category}</div>
                          <div className="text-sm text-gray-500">{line.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${line.budgetedAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${line.paidToDate.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                          ${line.pendingAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${line.remainingAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${line.percentageComplete}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{line.percentageComplete}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Draw History</h3>
            {role === 'builder' && (
              <Link
                href={`/dashboard/${role}/loans/${loanId}/draws/new`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                New Draw Request
              </Link>
            )}
          </div>
          <ul className="divide-y divide-gray-200">
            {draws.map((draw) => (
              <li key={draw.id}>
                <Link href={`/dashboard/${role}/draws/${draw.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Draw #{draw.drawNumber} - {draw.requestedDate}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Requested: ${draw.totalRequested.toLocaleString()}
                          {draw.totalApproved && ` • Approved: $${draw.totalApproved.toLocaleString()}`}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          draw.status === 'funded' ? 'bg-green-100 text-green-800' :
                          draw.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                          draw.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                          draw.status === 'submitted' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {draw.status.replace('_', ' ')}
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


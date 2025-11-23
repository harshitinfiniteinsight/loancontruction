'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockLoans, getBudgetByLoanId } from '@/lib/mockData';
import { BudgetLine } from '@/lib/types';
import Link from 'next/link';
import { Plus, X, Upload } from 'lucide-react';

export default function NewDrawPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLoan, setSelectedLoan] = useState<string>('');
  const [budget, setBudget] = useState<any>(null);
  const [lineItems, setLineItems] = useState<Array<{
    budgetLineId: string;
    category: string;
    description: string;
    amount: number;
  }>>([]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole || storedRole !== 'builder') {
      router.push('/');
      return;
    }

    const userId = localStorage.getItem('userId');
    const builderLoans = mockLoans.filter(loan => loan.builderId === userId);
    
    // Check for loanId in query params
    const loanIdParam = searchParams?.get('loanId');
    if (loanIdParam && builderLoans.some(loan => loan.id === loanIdParam)) {
      setSelectedLoan(loanIdParam);
    } else if (builderLoans.length > 0 && !selectedLoan) {
      setSelectedLoan(builderLoans[0].id);
    }
  }, [router, searchParams]);

  useEffect(() => {
    if (selectedLoan) {
      const budgetData = getBudgetByLoanId(selectedLoan);
      setBudget(budgetData);
    }
  }, [selectedLoan]);

  const handleAddLineItem = (budgetLine: BudgetLine) => {
    const remaining = budgetLine.remainingAmount;
    if (remaining > 0) {
      setLineItems([...lineItems, {
        budgetLineId: budgetLine.id,
        category: budgetLine.category,
        description: budgetLine.description,
        amount: 0,
      }]);
    }
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleAmountChange = (index: number, amount: number) => {
    const updated = [...lineItems];
    updated[index].amount = amount;
    setLineItems(updated);
  };

  const totalRequested = lineItems.reduce((sum, item) => sum + item.amount, 0);

  const userId = localStorage.getItem('userId');
  const builderLoans = mockLoans.filter(loan => loan.builderId === userId);

  return (
    <Layout role="builder" title="Builder Portal">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <Link href="/dashboard/builder/draws" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Draw Requests
          </Link>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">New Draw Request</h2>
          <p className="text-gray-600 mt-1">Create a new draw request for funding</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Select Loan</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <select
              value={selectedLoan}
              onChange={(e) => setSelectedLoan(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {builderLoans.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  {loan.loanNumber} - {loan.borrowerName} ({loan.propertyAddress})
                </option>
              ))}
            </select>
          </div>
        </div>

        {budget && (
          <>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Available Budget Lines</h3>
                <p className="mt-1 text-sm text-gray-500">Click on a budget line to add it to your draw request</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {budget.lines.filter(line => line.remainingAmount > 0).map((line) => (
                        <tr key={line.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {line.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{line.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${line.remainingAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleAddLineItem(line)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Add to Draw
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {lineItems.length > 0 && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Draw Line Items</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    {lineItems.map((item, index) => {
                      const budgetLine = budget.lines.find((l: BudgetLine) => l.id === item.budgetLineId);
                      const maxAmount = budgetLine?.remainingAmount || 0;
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.category}</div>
                              <div className="text-sm text-gray-500">{item.description}</div>
                            </div>
                            <button
                              onClick={() => handleRemoveLineItem(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Requested Amount (Max: ${maxAmount.toLocaleString()})
                            </label>
                            <input
                              type="number"
                              min="0"
                              max={maxAmount}
                              value={item.amount || ''}
                              onChange={(e) => handleAmountChange(index, parseFloat(e.target.value) || 0)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total Requested:</span>
                      <span className="text-2xl font-bold text-gray-900">${totalRequested.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Documents</h3>
                <p className="mt-1 text-sm text-gray-500">Upload invoices, receipts, or progress photos</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Drop files here or click to upload
                      </span>
                      <input type="file" className="sr-only" multiple />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/dashboard/builder/draws"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Save as Draft
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Submit for Review
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}


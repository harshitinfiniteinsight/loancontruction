'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockWarehouseLines, mockFundingEvents } from '@/lib/mockData';
import { WarehouseLine, FundingEvent } from '@/lib/types';
import Link from 'next/link';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function FundAdminPage() {
  const router = useRouter();
  const [warehouseLines, setWarehouseLines] = useState<WarehouseLine[]>([]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole || storedRole !== 'fund_admin') {
      router.push('/');
      return;
    }

    setWarehouseLines(mockWarehouseLines);
  }, [router]);

  const utilizationPercentage = (line: WarehouseLine) => {
    return (line.currentUtilization / line.totalLimit) * 100;
  };

  return (
    <Layout role="fund_admin" title="Fund Admin Portal">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Warehouse Lines</h2>
          <p className="text-gray-600">Monitor warehouse line utilization and capacity</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {warehouseLines.map((line) => {
            const utilization = utilizationPercentage(line);
            return (
              <div key={line.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{line.name}</dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          ${line.currentUtilization.toLocaleString()}
                        </dd>
                        <dd className="text-sm text-gray-500">
                          of ${line.totalLimit.toLocaleString()}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Utilization</span>
                      <span className={`font-semibold ${
                        utilization > 80 ? 'text-red-600' :
                        utilization > 60 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {utilization.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          utilization > 80 ? 'bg-red-600' :
                          utilization > 60 ? 'bg-yellow-600' :
                          'bg-green-600'
                        }`}
                        style={{ width: `${utilization}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Available: ${line.availableCapacity.toLocaleString()}</span>
                      <span>Rate: {line.interestRate}%</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`/dashboard/fund_admin/lines/${line.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Funding Events</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Reserve</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spread</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockFundingEvents.slice(0, 5).map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.fundedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Loan {event.loanId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${event.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${event.interestReserve.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.spread}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          event.status === 'completed' ? 'bg-green-100 text-green-800' :
                          event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Link
                href="/dashboard/fund_admin/funding"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All Funding Events →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


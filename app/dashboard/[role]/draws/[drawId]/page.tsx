'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockDraws, mockLoans, mockInspections } from '@/lib/mockData';
import { Draw, Loan, Inspection } from '@/lib/types';
import { FileText, CheckCircle, XCircle, Clock, Upload, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function DrawDetailPage() {
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;
  const drawId = params.drawId as string;
  const [draw, setDraw] = useState<Draw | null>(null);
  const [loan, setLoan] = useState<Loan | null>(null);
  const [inspection, setInspection] = useState<Inspection | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole || storedRole !== role) {
      router.push('/');
      return;
    }

    const drawData = mockDraws.find(d => d.id === drawId);
    if (drawData) {
      setDraw(drawData);
      const loanData = mockLoans.find(l => l.id === drawData.loanId);
      setLoan(loanData || null);
      if (drawData.inspectionId) {
        const inspectionData = mockInspections.find(i => i.id === drawData.inspectionId);
        setInspection(inspectionData || null);
      }
    }
  }, [drawId, role, router]);

  if (!draw) {
    return (
      <Layout role={role} title="Draw Details">
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

  const canEdit = role === 'builder' && draw.status === 'draft';
  const canApprove = (role === 'lender' || role === 'admin') && (draw.status === 'submitted' || draw.status === 'under_review');

  return (
    <Layout role={role} title={getTitle()}>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <Link href={`/dashboard/${role}${role === 'builder' ? '/draws' : ''}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to {role === 'builder' ? 'Draw Requests' : 'Dashboard'}
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Draw #{draw.drawNumber} Details
              </h3>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
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
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Loan</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {loan ? `${loan.loanNumber} - ${loan.borrowerName}` : 'N/A'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Requested Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{draw.requestedDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Requested By</dt>
                <dd className="mt-1 text-sm text-gray-900">{draw.requestedBy}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Requested</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900">
                  ${draw.totalRequested.toLocaleString()}
                </dd>
              </div>
              {draw.totalApproved && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Approved</dt>
                  <dd className="mt-1 text-sm font-semibold text-green-600">
                    ${draw.totalApproved.toLocaleString()}
                  </dd>
                </div>
              )}
              {draw.reviewedBy && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Reviewed By</dt>
                    <dd className="mt-1 text-sm text-gray-900">{draw.reviewedBy}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Reviewed At</dt>
                    <dd className="mt-1 text-sm text-gray-900">{draw.reviewedAt}</dd>
                  </div>
                </>
              )}
            </dl>
            {draw.notes && (
              <div className="mt-6">
                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                <dd className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{draw.notes}</dd>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Line Items</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                    {draw.totalApproved && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {draw.lineItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.requestedAmount.toLocaleString()}
                      </td>
                      {draw.totalApproved && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.approvedAmount ? `$${item.approvedAmount.toLocaleString()}` : '-'}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === 'approved' || item.status === 'paid' ? 'bg-green-100 text-green-800' :
                          item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {draw.documents && draw.documents.length > 0 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Documents</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <ul className="divide-y divide-gray-200">
                {draw.documents.map((doc) => (
                  <li key={doc.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">
                          {doc.category} • Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {inspection && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Inspection</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Inspector</dt>
                  <dd className="mt-1 text-sm text-gray-900">{inspection.inspectorName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Completed Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{inspection.completedDate}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Findings</dt>
                  <dd className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{inspection.findings}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      inspection.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {inspection.approved ? 'Approved' : 'Failed'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {canApprove && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-end space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Draw
                </button>
              </div>
            </div>
          </div>
        )}

        {role === 'builder' && draw.status === 'draft' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-end space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Edit
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Submit for Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}


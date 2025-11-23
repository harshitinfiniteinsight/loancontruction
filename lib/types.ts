export type UserRole = 'builder' | 'lender' | 'admin' | 'fund_admin' | 'inspector';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  tenantId: string;
}

export interface Loan {
  id: string;
  loanNumber: string;
  borrowerName: string;
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  loanAmount: number;
  currentBalance: number;
  status: 'active' | 'pending' | 'closed' | 'on_hold';
  builderId: string;
  builderName: string;
  startDate: string;
  expectedCompletionDate: string;
  currentPhase: string;
  progress: number; // percentage
}

export interface BudgetLine {
  id: string;
  category: string;
  description: string;
  budgetedAmount: number;
  paidToDate: number;
  pendingAmount: number;
  remainingAmount: number;
  percentageComplete: number;
}

export interface Budget {
  id: string;
  loanId: string;
  version: number;
  totalBudget: number;
  lines: BudgetLine[];
  createdAt: string;
  updatedAt: string;
}

export interface DrawLineItem {
  id: string;
  budgetLineId: string;
  category: string;
  description: string;
  requestedAmount: number;
  approvedAmount?: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
}

export interface Draw {
  id: string;
  loanId: string;
  drawNumber: number;
  requestedDate: string;
  requestedBy: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'funded';
  totalRequested: number;
  totalApproved?: number;
  lineItems: DrawLineItem[];
  documents: Document[];
  inspectionId?: string;
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
  url: string;
  category: 'invoice' | 'receipt' | 'photo' | 'contract' | 'other';
}

export interface Inspection {
  id: string;
  loanId: string;
  drawId?: string;
  inspectorName: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'failed';
  findings: string;
  photos: string[];
  approved: boolean;
}

export interface WarehouseLine {
  id: string;
  name: string;
  totalLimit: number;
  currentUtilization: number;
  availableCapacity: number;
  interestRate: number;
  status: 'active' | 'suspended' | 'closed';
  loans: string[];
}

export interface FundingEvent {
  id: string;
  drawId: string;
  loanId: string;
  amount: number;
  fundedDate: string;
  warehouseLineId: string;
  interestReserve: number;
  spread: number;
  status: 'pending' | 'completed' | 'failed';
}


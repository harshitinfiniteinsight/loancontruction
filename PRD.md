# Product Requirements Document (PRD)
## Construction Loan Administration SaaS Platform

**Version:** 1.0  
**Date:** November 2024  
**Status:** MVP Specification  
**Document Owner:** Product Team

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Overview](#product-overview)
3. [User Roles & Personas](#user-roles--personas)
4. [Core Features & Requirements](#core-features--requirements)
5. [User Workflows](#user-workflows)
6. [Data Model](#data-model)
7. [Technical Requirements](#technical-requirements)
8. [MVP Scope & Roadmap](#mvp-scope--roadmap)
9. [Success Metrics](#success-metrics)
10. [Appendices](#appendices)

---

## Executive Summary

### Problem Statement
Construction lending involves complex workflows for managing loans, budgets, draw requests, inspections, and funding events. Current solutions are fragmented, lack modern UX, and don't provide comprehensive workflow automation for builders, lenders, and fund administrators.

### Solution
A modern, web-based SaaS platform that centralizes construction loan administration, providing:
- Streamlined draw request and approval workflows
- Real-time budget tracking and management
- Builder portal for self-service draw submissions
- Lender dashboard for efficient loan oversight
- Fund administration tools for warehouse line management
- Document management and audit trails

### Target Market
- Construction lenders (banks, credit unions, private lenders)
- Builders and contractors
- Fund administrators and warehouse line providers
- Loan servicers

### Key Success Metrics
- 50% reduction in draw processing time
- 90%+ user adoption rate within 6 months
- 99.9% uptime SLA
- 80% reduction in manual data entry

---

## Product Overview

### Vision
To become the leading platform for construction loan administration, enabling seamless collaboration between builders, lenders, and fund administrators through intelligent workflow automation and real-time visibility.

### Product Goals
1. **Efficiency**: Reduce draw processing time from days to hours
2. **Transparency**: Provide real-time visibility into loan status, budgets, and funding
3. **Automation**: Eliminate manual processes and reduce errors
4. **Scalability**: Support thousands of loans and users
5. **Compliance**: Ensure auditability and regulatory compliance

### Key Differentiators
- Modern, intuitive user interface
- Workflow automation and notifications
- Real-time budget tracking
- Multi-tenant architecture
- Comprehensive audit logging
- Mobile-responsive design
- API-first architecture

---

## User Roles & Personas

### 1. Builder
**Profile**: Construction company owner or project manager  
**Goals**: Submit draw requests quickly, track approval status, upload documents  
**Pain Points**: Manual paperwork, unclear status, delays in funding  
**Key Features**:
- View assigned loans/jobs
- Submit draw requests
- Upload invoices, receipts, photos
- Track draw status
- View budget breakdowns

### 2. Lender
**Profile**: Loan officer or underwriter  
**Goals**: Review draws efficiently, approve/reject with context, track loan portfolio  
**Pain Points**: Incomplete information, manual review processes, lack of visibility  
**Key Features**:
- Review pending draw requests
- Approve/reject draws with notes
- View loan portfolio
- Access inspection reports
- Generate reports

### 3. Administrator
**Profile**: Loan administrator or operations manager  
**Goals**: Manage loans, import budgets, oversee workflows, ensure compliance  
**Pain Points**: Data entry errors, manual budget imports, lack of oversight  
**Key Features**:
- Manage loan lifecycle
- Import/export budgets (Excel)
- Oversee all draws
- Manage users and permissions
- Access audit logs
- Generate compliance reports

### 4. Fund Administrator
**Profile**: Warehouse line manager or treasury officer  
**Goals**: Monitor warehouse utilization, track funding events, manage interest reserves  
**Pain Points**: Manual tracking, lack of real-time visibility, complex calculations  
**Key Features**:
- Monitor warehouse line utilization
- Track funding events
- View interest reserve calculations
- Generate funding reports
- Manage warehouse lines

### 5. Inspector (Future)
**Profile**: Third-party inspector  
**Goals**: Submit inspection reports, upload photos, mark completion  
**Pain Points**: Paper-based processes, delayed submissions  
**Key Features**:
- Receive inspection requests
- Submit inspection reports
- Upload photos
- Mark completion status

---

## Core Features & Requirements

### 1. Loan Management

#### 1.1 Loan Creation & Setup
**Priority**: P0 (MVP)  
**Description**: Create and configure construction loans

**Requirements**:
- Create loan with basic information (borrower, property, loan amount, terms)
- Assign builder
- Set loan status (pending, active, on hold, closed)
- Track key dates (start, expected completion, actual completion)
- Store property address and details

**Acceptance Criteria**:
- Admin can create a new loan
- All required fields are validated
- Loan number is auto-generated
- Builder is assigned and notified

#### 1.2 Loan Dashboard
**Priority**: P0 (MVP)  
**Description**: View loan portfolio with filters and search

**Requirements**:
- List all loans with key information
- Filter by status, builder, date range
- Search by loan number, borrower name, address
- View loan summary (amount, balance, progress, status)
- Quick actions (view details, create draw, etc.)

**Acceptance Criteria**:
- Loans display in sortable table
- Filters work correctly
- Search returns relevant results
- Clicking loan navigates to detail page

### 2. Budget Management

#### 2.1 Budget Import
**Priority**: P0 (MVP)  
**Description**: Import construction budgets from Excel

**Requirements**:
- Upload Excel file (.xlsx, .xls)
- Map columns to budget fields (category, description, amount)
- Validate budget totals match loan amount
- Support multiple budget versions
- Preview before import
- Handle common Excel formats

**Acceptance Criteria**:
- Excel file uploads successfully
- Column mapping interface is intuitive
- Validation errors are clear
- Budget imports with all line items
- Version history is maintained

#### 2.2 Budget Tracking
**Priority**: P0 (MVP)  
**Description**: Track budget utilization and remaining amounts

**Requirements**:
- Display budget line items with categories
- Show paid-to-date, pending, and remaining amounts
- Calculate percentage complete per line item
- Visual progress indicators
- Budget vs. actual comparisons
- Alert when approaching budget limits

**Acceptance Criteria**:
- Budget breakdown displays accurately
- Calculations are correct
- Progress bars update in real-time
- Alerts trigger at configured thresholds

### 3. Draw Management

#### 3.1 Draw Request Creation (Builder)
**Priority**: P0 (MVP)  
**Description**: Builder creates draw request with line items

**Requirements**:
- Select loan/job
- Choose budget line items
- Enter requested amounts (validate against remaining budget)
- Add descriptions/notes
- Upload supporting documents (invoices, receipts, photos)
- Save as draft or submit for review
- View draw history

**Acceptance Criteria**:
- Builder can create draw from available budget lines
- Amount validation prevents over-budget requests
- Documents upload successfully
- Draft saves correctly
- Submission triggers notification to lender

#### 3.2 Draw Review & Approval (Lender/Admin)
**Priority**: P0 (MVP)  
**Description**: Review and approve/reject draw requests

**Requirements**:
- View pending draw requests
- Review line items and amounts
- View attached documents
- Check inspection status
- Approve full amount or partial amount
- Reject with reason
- Add review notes
- View approval history

**Acceptance Criteria**:
- Pending draws appear in review queue
- All draw details are visible
- Documents are viewable/downloadable
- Approval/rejection workflow is clear
- Notes are saved with draw

#### 3.3 Draw Worksheet (Admin)
**Priority**: P0 (MVP)  
**Description**: Comprehensive view of all draws for management

**Requirements**:
- View all draws across all loans
- Filter by status, date, loan, builder
- Bulk actions (approve multiple)
- Export to Excel
- Draw analytics (average processing time, approval rate)

**Acceptance Criteria**:
- All draws display in worksheet
- Filters work correctly
- Bulk actions function properly
- Export generates accurate file

### 4. Document Management

#### 4.1 Document Upload
**Priority**: P0 (MVP)  
**Description**: Upload and manage project documents

**Requirements**:
- Upload multiple file types (PDF, images, Excel, Word)
- Categorize documents (invoice, receipt, photo, contract, other)
- Tag documents to loans, draws, or general
- File size limits (10MB per file, 100MB per draw)
- Preview documents
- Download documents
- Version control

**Acceptance Criteria**:
- Files upload successfully
- Documents are categorized correctly
- Preview works for common formats
- Download preserves file integrity
- Storage is secure

#### 4.2 Document Organization
**Priority**: P1  
**Description**: Organize and search documents

**Requirements**:
- Search by name, category, date, uploader
- Filter by loan, draw, category
- Folder structure (optional)
- Document tags
- Bulk operations

**Acceptance Criteria**:
- Search returns relevant results
- Filters work correctly
- Documents are easily accessible

### 5. Inspection Workflow

#### 5.1 Inspection Scheduling
**Priority**: P1  
**Description**: Schedule inspections for draws

**Requirements**:
- Create inspection request
- Assign inspector
- Set inspection date
- Link to draw request
- Send notification to inspector
- Track inspection status

**Acceptance Criteria**:
- Inspection can be scheduled
- Inspector receives notification
- Status updates correctly

#### 5.2 Inspection Submission
**Priority**: P1  
**Description**: Inspector submits inspection report

**Requirements**:
- Upload inspection report
- Upload photos
- Mark pass/fail
- Add findings/notes
- Link to draw
- Auto-notify lender on completion

**Acceptance Criteria**:
- Inspector can submit report
- Photos upload successfully
- Status updates trigger notifications

### 6. Funding & Warehouse Management

#### 6.1 Warehouse Line Management
**Priority**: P1  
**Description**: Manage warehouse lines and utilization

**Requirements**:
- Create warehouse lines
- Set limits and terms
- Track current utilization
- Calculate available capacity
- View utilization percentage
- Alert when approaching limits
- Link loans to warehouse lines

**Acceptance Criteria**:
- Warehouse lines display correctly
- Utilization calculations are accurate
- Alerts trigger appropriately

#### 6.2 Funding Events
**Priority**: P1  
**Description**: Track funding events and interest calculations

**Requirements**:
- Record funding events
- Calculate interest reserve
- Apply spread calculations
- Link to draws and warehouse lines
- Generate funding reports
- Track funding history

**Acceptance Criteria**:
- Funding events are recorded accurately
- Calculations are correct
- Reports generate correctly

### 7. User Management & Permissions

#### 7.1 User Roles & Access
**Priority**: P0 (MVP)  
**Description**: Role-based access control

**Requirements**:
- Define user roles (Builder, Lender, Admin, Fund Admin, Inspector)
- Assign users to roles
- Set permissions per role
- Multi-tenant support (isolate data by organization)
- User invitation system
- Password reset

**Acceptance Criteria**:
- Users can only access authorized features
- Data is isolated by tenant
- Permissions work correctly

#### 7.2 Authentication & Security
**Priority**: P0 (MVP)  
**Description**: Secure user authentication

**Requirements**:
- Email/password authentication
- Password requirements (min 8 chars, complexity)
- Session management
- Two-factor authentication (future)
- SSO integration (future)
- Audit logging of access

**Acceptance Criteria**:
- Login/logout works correctly
- Sessions expire appropriately
- Security best practices followed

### 8. Notifications & Communication

#### 8.1 Email Notifications
**Priority**: P0 (MVP)  
**Description**: Automated email notifications

**Requirements**:
- Draw submitted → notify lender
- Draw approved/rejected → notify builder
- Inspection scheduled → notify inspector
- Funding completed → notify relevant parties
- Customizable notification preferences
- Email templates

**Acceptance Criteria**:
- Notifications send correctly
- Users receive relevant notifications
- Preferences are respected

#### 8.2 In-App Notifications
**Priority**: P1  
**Description**: Real-time in-app notifications

**Requirements**:
- Notification center/bell icon
- Unread count
- Mark as read
- Filter by type
- Click to navigate to relevant page

**Acceptance Criteria**:
- Notifications appear in real-time
- Count updates correctly
- Navigation works

---

## User Workflows

### Workflow 1: Builder Onboarding
1. Builder receives invitation email
2. Builder creates account
3. Builder logs in
4. Builder views assigned jobs/loans
5. Builder reviews budget breakdown
6. Builder is ready to submit draws

### Workflow 2: Draw Request Submission
1. Builder navigates to "New Draw Request"
2. Builder selects loan/job
3. Builder views available budget lines
4. Builder selects budget lines and enters amounts
5. Builder uploads supporting documents
6. Builder adds notes/descriptions
7. Builder submits draw request
8. System validates amounts against budget
9. System sends notification to lender
9. Draw status changes to "Submitted"

### Workflow 3: Draw Review & Approval
1. Lender receives notification of new draw
2. Lender navigates to "Draw Reviews"
3. Lender opens draw request
4. Lender reviews line items and amounts
5. Lender views attached documents
6. Lender checks inspection status (if applicable)
7. Lender approves full amount, partial amount, or rejects
8. Lender adds review notes
9. System updates draw status
10. System sends notification to builder
11. If approved, draw moves to funding queue

### Workflow 4: Budget Import
1. Admin navigates to "Budget Management"
2. Admin selects loan
3. Admin clicks "Import Budget"
4. Admin uploads Excel file
5. System parses Excel and shows preview
6. Admin maps columns to fields
7. Admin reviews mapped data
8. Admin confirms import
9. System validates totals
10. System creates budget version
11. Budget is now active for loan

### Workflow 5: Funding Event
1. Draw is approved
2. Fund admin reviews approved draws
3. Fund admin selects warehouse line
4. Fund admin initiates funding
5. System calculates interest reserve and spread
6. System records funding event
7. System updates warehouse line utilization
8. System updates draw status to "Funded"
9. System sends notification to builder
10. Builder receives funding

---

## Data Model

### Core Entities

#### Loan
- `id` (UUID)
- `loanNumber` (string, unique)
- `borrowerName` (string)
- `propertyAddress` (string)
- `city`, `state`, `zipCode` (string)
- `loanAmount` (decimal)
- `currentBalance` (decimal)
- `status` (enum: pending, active, on_hold, closed)
- `builderId` (FK to User)
- `startDate` (date)
- `expectedCompletionDate` (date)
- `actualCompletionDate` (date, nullable)
- `currentPhase` (string)
- `progress` (integer, 0-100)
- `tenantId` (FK to Tenant)
- `createdAt`, `updatedAt` (timestamp)

#### Budget
- `id` (UUID)
- `loanId` (FK to Loan)
- `version` (integer)
- `totalBudget` (decimal)
- `status` (enum: draft, active, archived)
- `createdBy` (FK to User)
- `createdAt`, `updatedAt` (timestamp)

#### BudgetLine
- `id` (UUID)
- `budgetId` (FK to Budget)
- `category` (string)
- `description` (string)
- `budgetedAmount` (decimal)
- `paidToDate` (decimal, calculated)
- `pendingAmount` (decimal, calculated)
- `remainingAmount` (decimal, calculated)
- `percentageComplete` (decimal, calculated)
- `lineOrder` (integer)
- `createdAt`, `updatedAt` (timestamp)

#### Draw
- `id` (UUID)
- `loanId` (FK to Loan)
- `drawNumber` (integer, sequential per loan)
- `requestedDate` (date)
- `requestedBy` (FK to User)
- `status` (enum: draft, submitted, under_review, approved, rejected, funded)
- `totalRequested` (decimal)
- `totalApproved` (decimal, nullable)
- `reviewedBy` (FK to User, nullable)
- `reviewedAt` (timestamp, nullable)
- `notes` (text, nullable)
- `rejectionReason` (text, nullable)
- `inspectionId` (FK to Inspection, nullable)
- `createdAt`, `updatedAt` (timestamp)

#### DrawLineItem
- `id` (UUID)
- `drawId` (FK to Draw)
- `budgetLineId` (FK to BudgetLine)
- `category` (string)
- `description` (string)
- `requestedAmount` (decimal)
- `approvedAmount` (decimal, nullable)
- `status` (enum: pending, approved, rejected, paid)
- `createdAt`, `updatedAt` (timestamp)

#### Document
- `id` (UUID)
- `name` (string)
- `type` (string, MIME type)
- `size` (integer, bytes)
- `url` (string, S3/key)
- `category` (enum: invoice, receipt, photo, contract, other)
- `loanId` (FK to Loan, nullable)
- `drawId` (FK to Draw, nullable)
- `uploadedBy` (FK to User)
- `uploadedAt` (timestamp)
- `tenantId` (FK to Tenant)

#### Inspection
- `id` (UUID)
- `loanId` (FK to Loan)
- `drawId` (FK to Draw, nullable)
- `inspectorName` (string)
- `scheduledDate` (date)
- `completedDate` (date, nullable)
- `status` (enum: scheduled, in_progress, completed, failed)
- `findings` (text)
- `approved` (boolean)
- `photos` (array of URLs)
- `createdAt`, `updatedAt` (timestamp)

#### WarehouseLine
- `id` (UUID)
- `name` (string)
- `totalLimit` (decimal)
- `currentUtilization` (decimal, calculated)
- `availableCapacity` (decimal, calculated)
- `interestRate` (decimal)
- `status` (enum: active, suspended, closed)
- `tenantId` (FK to Tenant)
- `createdAt`, `updatedAt` (timestamp)

#### FundingEvent
- `id` (UUID)
- `drawId` (FK to Draw)
- `loanId` (FK to Loan)
- `warehouseLineId` (FK to WarehouseLine)
- `amount` (decimal)
- `fundedDate` (date)
- `interestReserve` (decimal)
- `spread` (decimal)
- `status` (enum: pending, completed, failed)
- `createdAt`, `updatedAt` (timestamp)

#### User
- `id` (UUID)
- `email` (string, unique)
- `name` (string)
- `role` (enum: builder, lender, admin, fund_admin, inspector)
- `company` (string, nullable)
- `tenantId` (FK to Tenant)
- `passwordHash` (string)
- `isActive` (boolean)
- `lastLoginAt` (timestamp, nullable)
- `createdAt`, `updatedAt` (timestamp)

#### Tenant
- `id` (UUID)
- `name` (string)
- `subdomain` (string, unique, nullable)
- `isActive` (boolean)
- `createdAt`, `updatedAt` (timestamp)

#### AuditLog
- `id` (UUID)
- `userId` (FK to User, nullable)
- `action` (string)
- `entityType` (string)
- `entityId` (UUID)
- `changes` (JSON)
- `ipAddress` (string)
- `userAgent` (string)
- `createdAt` (timestamp)

### Relationships
- Loan → Budget (1:1)
- Loan → Draws (1:many)
- Loan → Documents (1:many)
- Budget → BudgetLines (1:many)
- Draw → DrawLineItems (1:many)
- Draw → Documents (1:many)
- Draw → Inspection (1:1, optional)
- WarehouseLine → Loans (many:many)
- WarehouseLine → FundingEvents (1:many)
- Tenant → Users (1:many)
- Tenant → Loans (1:many)

---

## Technical Requirements

### Architecture

#### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand (if needed)
- **Forms**: React Hook Form
- **UI Components**: Custom components with Tailwind
- **Icons**: Lucide React
- **Date Handling**: date-fns

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes or Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **ORM**: Prisma or TypeORM
- **File Storage**: AWS S3 or similar
- **Email**: SendGrid or AWS SES
- **Queue**: Bull/BullMQ with Redis (for async jobs)

#### Infrastructure
- **Hosting**: Vercel (frontend) / AWS/Railway (backend)
- **Database**: AWS RDS PostgreSQL or Supabase
- **CDN**: CloudFront or Vercel Edge Network
- **Monitoring**: Sentry, LogRocket
- **Analytics**: PostHog or Mixpanel

### Non-Functional Requirements

#### Performance
- Page load time < 2 seconds
- API response time < 500ms (p95)
- Support 1000+ concurrent users
- Database queries optimized with indexes

#### Security
- HTTPS only
- Data encryption at rest and in transit
- SQL injection prevention (ORM)
- XSS protection
- CSRF protection
- Rate limiting
- Regular security audits
- SOC 2 compliance (future)

#### Scalability
- Horizontal scaling capability
- Database connection pooling
- Caching strategy (Redis)
- CDN for static assets
- Multi-region support (future)

#### Reliability
- 99.9% uptime SLA
- Automated backups (daily)
- Disaster recovery plan
- Error monitoring and alerting

#### Usability
- Mobile-responsive design
- WCAG 2.1 AA compliance
- Intuitive navigation
- Clear error messages
- Help documentation

---

## MVP Scope & Roadmap

### MVP (Phase 1) - 3-4 Months
**Goal**: Core functionality for basic draw management workflow

**Features**:
1. ✅ User authentication (email/password)
2. ✅ Role-based access control (Builder, Lender, Admin)
3. ✅ Loan creation and management
4. ✅ Budget import from Excel
5. ✅ Budget tracking and visualization
6. ✅ Draw request creation (Builder)
7. ✅ Draw review and approval (Lender/Admin)
8. ✅ Document upload and management
9. ✅ Basic notifications (email)
10. ✅ Dashboard views for each role

**Deliverables**:
- Working web application
- Deployed to production
- User documentation
- Admin training materials

### Phase 2 - 2-3 Months
**Goal**: Enhanced workflows and fund administration

**Features**:
1. Inspection workflow
2. Warehouse line management
3. Funding events and calculations
4. Fund Admin portal
5. Advanced reporting
6. Bulk operations
7. In-app notifications
8. Advanced search and filters

### Phase 3 - 2-3 Months
**Goal**: Automation and advanced features

**Features**:
1. Workflow automation rules
2. Automated approval workflows
3. Advanced analytics and dashboards
4. API for integrations
5. Mobile app (iOS/Android)
6. Two-factor authentication
7. SSO integration
8. Custom reporting builder

### Phase 4 - Ongoing
**Goal**: Scale and optimize

**Features**:
1. AI-powered document processing
2. Predictive analytics
3. Advanced compliance features
4. Multi-currency support
5. International expansion features

---

## Success Metrics

### User Adoption
- **Target**: 90% of invited users activate accounts within 30 days
- **Measurement**: User activation rate

### Efficiency
- **Target**: 50% reduction in draw processing time
- **Measurement**: Average time from submission to approval

### User Satisfaction
- **Target**: NPS score > 50
- **Measurement**: Quarterly user surveys

### System Performance
- **Target**: 99.9% uptime
- **Measurement**: Uptime monitoring

### Business Metrics
- **Target**: 100 active loans within 6 months
- **Target**: 1000+ draw requests processed monthly
- **Measurement**: Analytics dashboard

---

## Appendices

### Appendix A: Glossary
- **Draw**: Request for payment against construction loan budget
- **Budget Line**: Individual category/item in construction budget
- **Warehouse Line**: Credit facility used to fund loans
- **Interest Reserve**: Funds set aside for interest payments
- **Spread**: Additional interest margin above base rate

### Appendix B: Assumptions
1. Users have basic computer literacy
2. Internet connectivity is available
3. Excel files follow standard formats
4. Email delivery is reliable
5. Users have email access

### Appendix C: Constraints
1. Must comply with financial regulations
2. Data must be auditable
3. Multi-tenant data isolation required
4. Must support common browsers (Chrome, Safari, Firefox, Edge)
5. Must work on desktop and tablet devices

### Appendix D: Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low user adoption | High | Medium | Comprehensive onboarding, training, support |
| Data security breach | Critical | Low | Security best practices, regular audits, encryption |
| Performance issues | High | Medium | Load testing, optimization, scalable architecture |
| Integration challenges | Medium | Medium | API-first design, thorough testing |
| Regulatory changes | High | Low | Flexible architecture, compliance monitoring |

### Appendix E: Open Questions
1. Integration requirements with existing loan origination systems?
2. Specific compliance requirements (state/federal)?
3. Preferred payment processing provider?
4. Reporting requirements for regulators?
5. Mobile app priority vs. web-only?

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Nov 2024 | Product Team | Initial PRD creation |

---

**End of Document**


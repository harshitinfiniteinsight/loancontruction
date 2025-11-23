# Construction Loan Administration Platform - MVP Prototype

A clickable prototype for a Construction Loan Administration SaaS platform with complete dummy data. This prototype demonstrates the core workflows for builders, lenders, administrators, and fund administrators.

## Features

### Builder Portal
- View active jobs and loan details
- Submit draw requests
- Upload documents and photos
- Track draw status
- View budget breakdowns

### Lender Dashboard
- Review loan portfolio
- Review and approve draw requests
- Track draw status and history

### Admin Dashboard
- Manage loan list
- Import and manage budgets
- Draw worksheet and approval workflow
- Document management
- Comprehensive loan oversight

### Fund Admin Portal
- Monitor warehouse line utilization
- Track funding events
- View interest reserve calculations
- Monitor spread and funding status

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Login

The prototype uses role-based access. On the home page, select one of the following roles to login:

- **Builder Portal** - View and manage construction jobs, submit draws
- **Lender Dashboard** - Review and approve draw requests
- **Admin Dashboard** - Full administrative access
- **Fund Admin Portal** - Warehouse line and funding management

## Project Structure

```
├── app/
│   ├── dashboard/
│   │   ├── [role]/          # Role-based dashboard pages
│   │   ├── builder/          # Builder-specific pages
│   │   ├── lender/           # Lender-specific pages
│   │   ├── admin/            # Admin-specific pages
│   │   └── fund_admin/       # Fund admin pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home/login page
├── components/
│   └── Layout.tsx            # Shared layout component
├── lib/
│   ├── types.ts              # TypeScript type definitions
│   └── mockData.ts           # Dummy data for prototype
└── public/                   # Static assets
```

## Key Workflows Demonstrated

1. **Builder Onboarding** - View jobs assigned to builder
2. **Budget Import** - Admin can import budgets (UI ready)
3. **Draw Request Submission** - Builder creates and submits draw requests
4. **Draw Review & Approval** - Lender/Admin reviews and approves draws
5. **Document Management** - Upload and manage project documents
6. **Inspection Workflows** - View inspection results tied to draws
7. **Funding Events** - Fund admin tracks warehouse utilization and funding

## Dummy Data

The prototype includes comprehensive dummy data:
- 3 sample loans
- Multiple draw requests in various states
- Budget breakdowns with line items
- Documents and inspections
- Warehouse lines and funding events

All data is stored in `lib/mockData.ts` and can be easily modified for demonstration purposes.

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

3. Vercel will automatically detect Next.js and configure the build settings

4. Deploy - Your prototype will be live in seconds!

### Manual Deployment

Alternatively, you can use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Development Notes

- This is a **prototype only** - no backend or database
- Authentication is simulated using localStorage
- All data is client-side only
- Navigation uses Next.js Link components for client-side routing
- Forms are non-functional (UI only)

## Next Steps for Production

To convert this prototype into a production application:

1. **Backend API** - Implement REST or GraphQL API
2. **Database** - Set up PostgreSQL or similar
3. **Authentication** - Integrate Auth0, Clerk, or custom auth
4. **File Storage** - Integrate S3 or similar for document storage
5. **Real-time Updates** - Add WebSocket support for status updates
6. **Excel Import** - Implement actual Excel parsing for budgets
7. **Email Notifications** - Add email service integration
8. **Multi-tenancy** - Implement proper tenant isolation
9. **Audit Logging** - Add comprehensive audit trail
10. **Permissions** - Implement fine-grained role-based access control

## License

This is a prototype/demo project for demonstration purposes.


'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function BuilderLoanDrawNewPage() {
  const router = useRouter();
  const params = useParams();
  const loanId = params.loanId as string;

  useEffect(() => {
    // Redirect to the main new draw page with loan pre-selected
    router.push(`/dashboard/builder/draws/new?loanId=${loanId}`);
  }, [loanId, router]);

  return null;
}


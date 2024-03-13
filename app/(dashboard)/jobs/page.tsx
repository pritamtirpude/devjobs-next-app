'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const JobsPage = () => {
  const router = useRouter();
  return (
    <div className="mt-11">
      <Button
        onClick={() => router.push('/add-job')}
        variant="default"
        className="bg-primary-light-violet py-4 font-bold text-white transition-opacity  hover:opacity-50 dark:bg-secondary-dark-darkBlue"
      >
        Add Job
      </Button>
    </div>
  );
};

export default JobsPage;

'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getAllJobsAction } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';
import JobsList from '@/components/JobsList/JobsList';

const JobsPage = () => {
  const router = useRouter();

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobsAction(),
  });

  return (
    <div className="mt-11">
      <Button
        onClick={() => router.push('/add-job')}
        variant="default"
        className="bg-primary-light-violet py-4 font-bold text-white transition-opacity  hover:opacity-50 dark:bg-secondary-dark-darkBlue"
      >
        Add Job
      </Button>

      {isLoading ? <h1>Loading...</h1> : <JobsList jobsData={jobsData || []} />}
    </div>
  );
};

export default JobsPage;

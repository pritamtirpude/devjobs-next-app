'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllJobsAction } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';
import JobsList from '@/components/JobsList/JobsList';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import SearchFilters from '@/components/SearchFilters/SearchFilters';
import MobileSearchFilters from '@/components/MobileSearchFilters/MobileSearchFilters';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Fragment } from 'react';

const JobsPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const location = searchParams.get('location') || '';
  const contract = searchParams.get('contract') || '';

  const router = useRouter();

  const { matches } = useMediaQuery({ query: '(max-width: 767px)' });

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ['jobs', search || '', location || '', contract || ''],
    queryFn: () => getAllJobsAction({ search, location, contract }),
  });

  return (
    <Fragment>
      {matches ? <MobileSearchFilters /> : <SearchFilters />}
      <div className="mt-11">
        <Button
          onClick={() => router.push('/add-job')}
          variant="default"
          className="bg-primary-light-violet py-4 font-bold text-white transition-opacity  hover:opacity-50 dark:bg-secondary-dark-darkBlue"
        >
          Add Job
        </Button>

        {isLoading ? <SkeletonCard /> : <JobsList jobsData={jobsData || []} />}
      </div>
    </Fragment>
  );
};

export default JobsPage;

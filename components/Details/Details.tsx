'use client';

import { getSingleJob } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';

const Details = ({ jobId }: { jobId: string }) => {
  const { data: job } = useQuery({
    queryKey: ['singlejob', jobId],
    queryFn: () => getSingleJob(jobId),
  });

  return <div>Details</div>;
};

export default Details;

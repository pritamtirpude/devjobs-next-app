'use client';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import CreateJob from '@/components/CreateJob/CreateJob';

const AddJobPage = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJob />
    </HydrationBoundary>
  );
};

export default AddJobPage;

import { getSingleJob } from '@/utils/action';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Details from '@/components/Details/Details';

const JobDetailPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['singlejob', params.id],
    queryFn: () => getSingleJob(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Details jobId={params.id} />
    </HydrationBoundary>
  );
};

export default JobDetailPage;

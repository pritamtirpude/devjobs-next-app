import { JobType } from '@/utils/types';
import JobCard from '../JobCard/JobCard';

type JobsListProps = {
  jobsData: JobType[] | null;
};

const JobsList = ({ jobsData }: JobsListProps) => {
  if (jobsData && jobsData?.length <= 0) {
    return <h1 className="mt-4 text-center">No Jobs Found</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-[30px]  py-4 md:grid-cols-2 lg:grid-cols-3 ">
      {jobsData?.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
};

export default JobsList;

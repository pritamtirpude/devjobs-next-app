import { JobType } from '@/utils/types';
import JobCard from '../JobCard/JobCard';

type JobsListProps = {
  jobsData: JobType[] | null;
};

const JobsList = ({ jobsData }: JobsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-[30px]  py-4 md:grid-cols-2 lg:grid-cols-3 ">
      {jobsData?.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
};

export default JobsList;

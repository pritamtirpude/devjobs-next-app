import { JobType } from '@/utils/types';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

type JobCardProps = {
  job: JobType | null;
};

const JobCard = ({ job }: JobCardProps) => {
  const createdAt: Date | undefined = job?.createdAt;
  const distanceToNow =
    createdAt !== undefined
      ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
      : '';
  return (
    <Link href={`/jobs/${job?.id}`}>
      <Card className="border-0 bg-white shadow-xl focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-secondary-dark-darkBlue">
        <CardContent className="p-0">
          <div className="p-8">
            <span className="text-base text-secondary-dark-darkGray">
              {distanceToNow}&nbsp;
              <span className="font-bold">.</span> {job?.contract}
            </span>

            <h2 className="mt-3 text-xl font-bold text-secondary-dark-darkBlue dark:text-white">
              {job?.position}
            </h2>

            <h3 className="mt-4 text-secondary-dark-darkGray">
              {job?.company}
            </h3>

            <h3 className="mt-11 font-bold text-primary-light-violet">
              {job?.location}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;

'use client';

import { getSingleJob } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

const Details = ({ jobId }: { jobId: string }) => {
  const { data: job } = useQuery({
    queryKey: ['singlejob', jobId],
    queryFn: () => getSingleJob(jobId),
  });

  const createdAt: Date | undefined = job?.createdAt;
  const distanceToNow =
    createdAt !== undefined
      ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
      : '';

  return (
    <div className="mx-auto -mt-6 max-w-3xl pb-[50px] md:-mt-12 lg:-mt-12">
      <div className="flex flex-col items-center gap-6 rounded-md bg-white p-[42px] dark:bg-secondary-dark-darkBlue md:flex-row md:justify-between md:gap-0 lg:flex-row lg:justify-between lg:gap-0">
        <h1 className="text-2xl font-bold text-secondary-dark-darkBlue dark:text-white">
          {job?.company}
        </h1>

        <Link
          href={`${job?.website}`}
          target="_blank"
          className="rounded-md bg-primary-light-lightGrey p-3 font-bold text-primary-light-violet shadow-md transition-opacity hover:opacity-50  dark:bg-slate-700 dark:text-white"
        >
          Company site
        </Link>
      </div>

      <div className="mt-8 bg-white p-6 dark:bg-secondary-dark-darkBlue md:p-11 lg:p-11">
        <div className="flex flex-col items-center gap-[50px] md:flex-row md:justify-between md:gap-0 lg:flex-row lg:justify-between lg:gap-0">
          <div className="size-full">
            <span className="text-base text-secondary-dark-darkGray">
              {distanceToNow}&nbsp;
              <span className="font-bold">.</span> {job?.contract}
            </span>

            <h2 className="mt-2 text-xl font-bold text-secondary-dark-darkBlue  dark:text-white  md:text-nowrap lg:text-nowrap">
              {job?.position}
            </h2>

            <h3 className="mt-2 items-end justify-end font-bold text-primary-light-violet">
              {job?.location}
            </h3>
          </div>

          <div className="flex w-full  justify-end">
            <Button
              variant="default"
              className="w-full bg-primary-light-violet py-4 font-bold text-white transition-opacity hover:opacity-50 md:w-auto lg:w-auto"
            >
              Apply Now
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-justify text-secondary-dark-gray">
            {job?.description}
          </p>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-secondary-dark-darkBlue dark:text-white">
              Requirements
            </h2>

            <div className="mt-5">
              <p className="text-justify text-secondary-dark-gray">
                {job?.requirementcontent}
              </p>

              <ul className="mt-6 list-disc marker:font-bold marker:text-primary-light-violet">
                {job?.requirementitems &&
                  job?.requirementitems.map((item) => (
                    <li
                      className="my-2 text-justify text-secondary-dark-gray"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-secondary-dark-darkBlue dark:text-white">
              What You Will Do
            </h2>

            <div className="mt-5">
              <p className="text-justify text-secondary-dark-gray">
                {job?.rolecontent}
              </p>

              <ul className="mt-6 list-decimal marker:font-bold marker:text-primary-light-violet">
                {job?.roleitems &&
                  job?.roleitems.map((item) => (
                    <li
                      className="my-2 text-justify text-secondary-dark-gray"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

'use server';

import prisma from './db';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { JobType } from './types';
import { addJobSchema } from './schema';

const checkAuthorization = (): string => {
  const { userId } = auth();

  if (!userId) redirect('/');

  return userId;
};

export async function createJobAction(
  payload: JobType
): Promise<JobType | null> {
  const userId = checkAuthorization();

  try {
    addJobSchema.parse(payload);
    const job: JobType = await prisma.job.create({
      data: {
        ...payload,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllJobsAction(): Promise<JobType[] | null> {
  const userId = checkAuthorization();
  try {
    const jobs: JobType[] = await prisma.job.findMany({
      where: {
        clerkId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return jobs;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSingleJob(id: string): Promise<JobType | null> {
  let job: JobType | null = null;
  const userId = checkAuthorization();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    job = null;
  }

  if (!job) {
    redirect('/jobs');
  }

  return job;
}

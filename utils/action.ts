'use server';

import prisma from './db';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { JobType } from './types';
import { addJobSchema } from './schema';
import { Prisma } from '@prisma/client';

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

type getAllJobTypes = {
  search: string;
  location: string;
  contract: string;
};

export async function getAllJobsAction({
  search,
  location,
  contract,
}: getAllJobTypes): Promise<JobType[] | null> {
  const userId = checkAuthorization();
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            company: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    if (location) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            location: {
              contains: location,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    if (contract) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            contract: {
              contains: contract,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
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

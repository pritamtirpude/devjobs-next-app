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

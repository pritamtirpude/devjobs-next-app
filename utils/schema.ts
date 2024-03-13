/* eslint-disable no-unused-vars */
import * as z from 'zod';

export enum JobContract {
  FullTime = 'Full Time',
  PartTime = 'Part Time',
  Internship = 'Internship',
}

export const addJobSchema = z.object({
  company: z.string().min(1, { message: 'Company name is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
  contract: z.nativeEnum(JobContract),
  location: z.string().min(1, { message: 'Location is required' }),
  website: z
    .string()
    .refine((value) => {
      if (value === '') return true;
      return (
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
          value
        ),
        { message: 'Please enter a valid URL' }
      );
    })
    .optional(),
  description: z.string().min(1, { message: 'Description is required' }),
  requirementcontent: z.string().optional(),
  requirementitem: z.array(z.string()).optional(),
  rolecontent: z.string().optional(),
  roleitem: z.array(z.string()).optional(),
});

export type JobType = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  clerkId?: string;
  company: string;
  position: string;
  website?: string | null;
  description: string;
  contract: string;
  location: string;
  requirementcontent: string;
  requirementitems: string[];
  rolecontent: string;
  roleitems: string[];
};

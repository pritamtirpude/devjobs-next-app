'use client';

import React, { MouseEvent, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { XCircle, PlusCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Spinner from '../Spinner/Spinner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobType } from '@/utils/types';
import { createJobAction } from '@/utils/action';
import { JobContract, addJobSchema } from '@/utils/schema';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const CreateJob = () => {
  const [requirementValue, setRequirementValue] = useState<string>('');
  const [roleValue, setRoleValue] = useState<string>('');

  const { toast } = useToast();

  const router = useRouter();

  const queryClient = useQueryClient();

  const createJobMutation = useMutation({
    mutationKey: ['addjob'],
    mutationFn: (payload: JobType) => createJobAction(payload),
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Job created successfully',
      });
      form.reset();
      router.push('/jobs');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
      });
    },
  });

  const form = useForm<z.infer<typeof addJobSchema>>({
    resolver: zodResolver(addJobSchema),
    defaultValues: {
      company: '',
      position: '',
      location: '',
      description: '',
      website: '',
      requirementcontent: '',
      requirementitem: [],
      rolecontent: '',
      roleitem: [],
    },
  });

  async function onSubmit(values: z.infer<typeof addJobSchema>) {
    const {
      company,
      position,
      contract,
      location,
      description,
      website,
      requirementcontent,
      requirementitem,
      rolecontent,
      roleitem,
    } = values;

    createJobMutation.mutate({
      company,
      position,
      contract,
      location,
      description,
      website: website || '',
      requirementcontent: requirementcontent || '',
      requirementitems: requirementitem || [],
      rolecontent: rolecontent || '',
      roleitems: roleitem || [],
    });
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>, field: any) => {
    e.preventDefault();

    if (requirementValue) {
      form.setValue('requirementitem', [...field.value, requirementValue]);
      setRequirementValue('');
    }

    if (roleValue) {
      form.setValue('roleitem', [...field.value, roleValue]);
      setRoleValue('');
    }
  };

  const handleRequirementRemove = (requirement: string, field: any) => {
    const newRequirement = field.value.filter(
      (item: string) => item !== requirement
    );

    form.setValue('requirementitem', newRequirement);
  };

  const handleRoleRemove = (role: string, field: any) => {
    const newRole = field.value.filter((item: string) => item !== role);

    form.setValue('roleitem', newRole);
  };

  return (
    <div className="py-20">
      <Form {...form}>
        <h1 className="mb-2 font-bold text-primary-light-violet">
          Company Details
        </h1>
        <form
          className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    form.formState.errors.company
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Company
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className={`border-2 bg-white p-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight ${
                      form.formState.errors.company
                        ? 'border-red-500'
                        : 'border-secondary-dark-gray'
                    }`}
                    placeholder="Company"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    form.formState.errors.position
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Position
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className={`border-2 bg-white p-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight ${
                      form.formState.errors.position
                        ? 'border-red-500'
                        : 'border-secondary-dark-gray'
                    }`}
                    placeholder="Position"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contract <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`border-2 bg-white p-6 text-secondary-dark-darkBlue focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${form.formState.errors.contract ? ' border-red-500' : 'border-secondary-dark-gray'}`}
                    >
                      <SelectValue
                        placeholder="Select a contract"
                        className=""
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {Object.values(JobContract).map((item) => (
                      <SelectItem
                        className="cursor-pointer text-secondary-dark-darkBlue hover:bg-primary-light-lightGrey"
                        key={item}
                        value={item}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    form.formState.errors.location
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Location
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className={`border-2 bg-white p-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight ${
                      form.formState.errors.location
                        ? 'border-red-500'
                        : 'border-secondary-dark-gray'
                    }`}
                    placeholder="Location"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    form.formState.errors.website
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Website
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className={`border-2 bg-white p-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight ${
                      form.formState.errors.website
                        ? 'border-red-500'
                        : 'border-secondary-dark-gray'
                    }`}
                    placeholder="https://example.com/scoot/apply"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-2">
                <FormLabel
                  className={`${
                    form.formState.errors.description
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Description
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add your company description"
                    className="resize-none border-2 border-secondary-dark-gray bg-white px-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <Separator className="mt-2 bg-slate-300 md:col-span-2 lg:col-span-2" />

          <h2 className="font-bold text-primary-light-violet">Requirements</h2>

          <FormField
            control={form.control}
            name="requirementcontent"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-2">
                <FormLabel
                  className={`${
                    form.formState.errors.requirementcontent
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Requirement Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add requirement description"
                    className="resize-none border-2 border-secondary-dark-gray bg-white px-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requirementitem"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-2">
                <FormLabel
                  className={`${
                    form.formState.errors.requirementitem
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Requirement
                </FormLabel>
                <FormControl>
                  <>
                    <div className="flex w-full items-center gap-2">
                      <Input
                        onChange={(e) => setRequirementValue(e.target.value)}
                        type="text"
                        value={requirementValue}
                        className={`border-2 bg-white p-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight ${
                          form.formState.errors.requirementitem
                            ? 'border-red-500'
                            : 'border-secondary-dark-gray'
                        }`}
                        placeholder="Add Requirement"
                      />
                      <Button
                        onClick={(e) => handleClick(e, field)}
                        type="button"
                        className="bg-primary-light-lightViolet p-7 dark:bg-secondary-dark-darkBlue"
                        variant="default"
                      >
                        <PlusCircle className="size-5 text-white" />
                      </Button>
                    </div>

                    <div>
                      {field?.value && field?.value?.length > 0 && (
                        <>
                          {field.value?.map((item: any) => (
                            <div
                              key={item}
                              className=" mt-3 flex w-full flex-col gap-2"
                            >
                              <div
                                className="flex w-full items-center justify-between rounded-md bg-secondary-dark-darkBlue p-2"
                                key={item}
                              >
                                <p className="w-full max-w-[800px] text-sm text-white">
                                  {item}
                                </p>
                                <XCircle
                                  className="cursor-pointer text-white"
                                  onClick={() =>
                                    handleRequirementRemove(item, field)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </>
                </FormControl>
              </FormItem>
            )}
          />

          <Separator className="mt-2 bg-slate-300 md:col-span-2 lg:col-span-2" />

          <h2 className="font-bold text-primary-light-violet">Roles</h2>

          <FormField
            control={form.control}
            name="rolecontent"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-2">
                <FormLabel
                  className={`${
                    form.formState.errors.rolecontent
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Role Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add role description"
                    className="resize-none border-2 border-secondary-dark-gray bg-white px-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roleitem"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-2">
                <FormLabel
                  className={`${
                    form.formState.errors.roleitem
                      ? 'text-red-500'
                      : 'text-secondary-dark-darkBlue dark:text-white'
                  }`}
                >
                  Role
                </FormLabel>
                <FormControl>
                  <>
                    <div className="flex w-full items-center gap-2">
                      <Input
                        onChange={(e) => setRoleValue(e.target.value)}
                        value={roleValue}
                        type="text"
                        className={`border-2 bg-white p-6 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-secondary-dark-midnight ${
                          form.formState.errors.roleitem
                            ? 'border-red-500'
                            : 'border-secondary-dark-gray'
                        }`}
                        placeholder="Add Role"
                      />

                      <Button
                        onClick={(e) => handleClick(e, field)}
                        type="button"
                        className="bg-primary-light-lightViolet p-7 dark:bg-secondary-dark-darkBlue"
                        variant="default"
                      >
                        <PlusCircle className="size-5 text-white" />
                      </Button>
                    </div>

                    <div>
                      {field?.value && field?.value?.length > 0 && (
                        <>
                          {field.value?.map((item: any) => (
                            <div
                              key={item}
                              className=" mt-3 flex w-full flex-col gap-2"
                            >
                              <div
                                className="flex w-full items-center justify-between rounded-md bg-secondary-dark-darkBlue p-2"
                                key={item}
                              >
                                <p className="w-full max-w-[800px] text-sm text-white">
                                  {item}
                                </p>
                                <XCircle
                                  className="cursor-pointer text-white"
                                  onClick={() => handleRoleRemove(item, field)}
                                />
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-4 flex w-full items-center justify-center md:col-span-2 lg:col-span-2">
            <Button
              disabled={createJobMutation.isPending}
              type="submit"
              className="w-full bg-primary-light-violet px-8 py-4 font-bold text-white transition-opacity hover:opacity-50 dark:bg-secondary-dark-darkBlue  md:w-1/3 lg:w-1/3"
            >
              {createJobMutation.isPending ? (
                <Spinner isPending={createJobMutation.isPending} />
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateJob;

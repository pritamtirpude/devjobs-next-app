import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { Filter, Search } from 'lucide-react';
import { Button } from '../ui/button';

type Checked = DropdownMenuCheckboxItemProps['checked'];

const MobileSearchFilters = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const [fullTime, setFullTime] = useState<Checked>(true);
  const [partTime, setPartTime] = useState<Checked>(false);
  const [internship, setInternShip] = useState<Checked>(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const search = formData.get('search') as string;

    const params = new URLSearchParams();
    params.set('search', search);

    if (fullTime) {
      params.set('contract', 'full time');
    } else if (partTime) {
      params.set('contract', 'part time');
    } else if (internship) {
      params.set('contract', 'internship');
    } else {
      params.set('contract', '');
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="-mt-5 rounded-md bg-white px-6 py-[30px] dark:bg-secondary-dark-darkBlue">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between"
      >
        <div className="w-full">
          <Input
            name="search"
            className="w-full border-0 bg-transparent p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Filter by position,company name"
            defaultValue={search}
          />
        </div>
        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="default" size="icon">
                <Filter className="size-6 text-primary-light-violet" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              <DropdownMenuLabel className="text-secondary-dark-darkBlue">
                Contract
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-secondary-dark-gray" />
              <DropdownMenuCheckboxItem
                className="text-secondary-dark-darkBlue"
                checked={fullTime}
                onCheckedChange={setFullTime}
              >
                Full Time
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="text-secondary-dark-darkBlue"
                checked={partTime}
                onCheckedChange={setPartTime}
              >
                Part Time
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="text-secondary-dark-darkBlue"
                checked={internship}
                onCheckedChange={setInternShip}
              >
                Internship
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex w-full justify-end">
            <Button
              variant="default"
              size="icon"
              type="submit"
              className="bg-primary-light-violet transition-opacity  hover:opacity-50"
            >
              <Search className="size-6 text-white" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MobileSearchFilters;

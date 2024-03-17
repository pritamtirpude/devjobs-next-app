import { FormEvent, useState } from 'react';
import { Input } from '../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import searchIcon from '../../public/assets/desktop/icon-search.svg';
import locationIcon from '../../public/assets/desktop/icon-location.svg';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { Filter } from 'lucide-react';

type Checked = DropdownMenuCheckboxItemProps['checked'];

const SearchFilters = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const location = searchParams.get('location') || '';

  const [fullTime, setFullTime] = useState<Checked>(true);
  const [partTime, setPartTime] = useState<Checked>(false);
  const [internship, setInternShip] = useState<Checked>(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const search = formData.get('search') as string;
    const location = formData.get('location') as string;

    const params = new URLSearchParams();
    params.set('search', search);
    params.set('location', location);

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
    <div className="hidden rounded-md bg-white px-8 py-7 dark:bg-secondary-dark-darkBlue md:-mt-10 md:block lg:-mt-10 lg:block">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between"
      >
        <div className="relative w-full">
          <div className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image src={searchIcon} alt="search icon" />
          </div>
          <Input
            name="search"
            className="w-full border-0 bg-transparent px-11 py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Filter by position,company name"
            defaultValue={search}
          />
        </div>
        <div className="relative w-full">
          <div className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image src={locationIcon} alt="location icon" />
          </div>
          <Input
            name="location"
            className="w-full border-0 bg-transparent px-11 py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Location"
            defaultValue={location}
          />
        </div>
        <div className="flex w-full gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-1">
                <Button type="button" variant="default" size="icon">
                  <Filter className="size-6 text-primary-light-violet" />
                </Button>
                <span className="text-sm text-secondary-dark-darkGray">
                  Contract
                </span>
              </div>
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
              type="submit"
              className="bg-primary-light-violet font-bold text-white transition-opacity  hover:opacity-50"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;

'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Theme = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white" asChild>
        <Button
          variant="default"
          size="icon"
          className="focus-visible:ring-offset-0"
        >
          <Sun className="size-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute size-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-secondary-dark-darkBlue" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem
          className="cursor-pointer font-bold hover:bg-primary-light-lightGrey dark:text-secondary-dark-darkBlue"
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer font-bold hover:bg-primary-light-lightGrey  dark:text-secondary-dark-darkBlue"
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer font-bold hover:bg-primary-light-lightGrey  dark:text-secondary-dark-darkBlue"
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Theme;

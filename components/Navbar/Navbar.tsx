import Image from 'next/image';
import devJobsLogo from '../../public/assets/desktop/logo.svg';
import { UserButton } from '@clerk/nextjs';
import Theme from '../Theme/Theme';

const Navbar = () => {
  return (
    <header className="flex justify-center  bg-mobile-header-pattern bg-cover bg-center  bg-no-repeat py-10 md:rounded-none md:bg-tablet-header-pattern md:bg-left   md:py-20  lg:rounded-none lg:bg-desktop-header-pattern lg:bg-left  lg:py-20">
      <div className="mx-auto flex  w-full max-w-5xl items-center justify-between  px-8 lg:px-0">
        <div>
          <Image src={devJobsLogo} priority alt="devjobs logo" />
        </div>

        <div className="flex items-center gap-4">
          <Theme />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

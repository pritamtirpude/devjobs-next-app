import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-light-lightGrey dark:bg-secondary-dark-midnight">
      <section className="mx-4 max-w-none text-center  lg:mx-auto lg:max-w-[600px]">
        <h1 className="text-6xl font-bold text-secondary-dark-midnight dark:text-white">
          Dev<span className="text-primary-light-violet">Jobs</span>
        </h1>
        <p className="mt-4 text-base text-secondary-dark-gray">
          At our cutting-edge web app, we&apos;re revolutionizing the way
          companies connect with top talent. Backed by powerful authentication
          features, our platform offers seamless access for developers to
          explore a myriad of job opportunities.
        </p>
        <Button className="mt-4 bg-primary-light-violet px-10  py-4 font-bold text-white transition-opacity  hover:opacity-50 dark:bg-secondary-dark-darkBlue">
          <Link href="/jobs">Get Started</Link>
        </Button>
      </section>
    </main>
  );
}

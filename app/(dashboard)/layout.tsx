import React, { PropsWithChildren } from 'react';
import Navbar from '@/components/Navbar/Navbar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-primary-light-lightGrey dark:bg-secondary-dark-midnight">
      <Navbar />
      <section className="px-8  lg:mx-auto lg:max-w-5xl lg:px-0">
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;

import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { Kumbh_Sans } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './Providers';

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kumbhSans',
});

export const metadata: Metadata = {
  title: 'DevJobs',
  description:
    'The Dev Jobs web application is designed to connect developers with relevant job opportunities in the tech industry. It serves as a platform for both job seekers and employers, facilitating the recruitment process in the software development field. Users can browse job listings, submit applications, and manage their job search activities efficiently through this application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${kumbhSans.className}`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

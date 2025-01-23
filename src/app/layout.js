import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import IwbTheme from '../providers/theme';
import { MainNav } from '@/components/navbar';

const geistSans = Geist({
  variable: '--font-noto-sans',
});

const geistMono = Geist_Mono({
  variable: '--font-noto-sans-mono',
});

export const metadata = {
  title: 'IWB Tech Blog',
  description: 'next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100 dark:bg-slate-800 dark:text-white`}
      >
        <IwbTheme>
          <div>
            <MainNav />
            <div>{children}</div>
          </div>
        </IwbTheme>
      </body>
    </html>
  );
}

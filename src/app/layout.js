import { Geist, Geist_Mono } from "next/font/google";
import IwbTheme from "../providers/theme";
import MainNav from "@/components/navbar";
import Script from "next/script";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IMWIND",
  description: "IMWIND BLOG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-SDZFGG4YWC"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SDZFGG4YWC');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-800 dark:text-white`}
      >
        <IwbTheme>
          <div>
            <MainNav />
            <div className="max-w-5xl mx-auto p-4">{children}</div>
          </div>
        </IwbTheme>
      </body>
    </html>
  );
}

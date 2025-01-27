import IwbTheme from "../providers/theme";
import MainNav from "@/components/navbar";
import Script from "next/script";

import "./globals.css";
import UpTop from "@/components/up-top";

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
        className={`antialiased bg-white dark:bg-slate-800 dark:text-zinc-100`}
      >
        <IwbTheme>
          <MainNav />
          <div className="max-w-5xl mx-auto p-4">{children}</div>
        </IwbTheme>
        <UpTop />
      </body>
    </html>
  );
}

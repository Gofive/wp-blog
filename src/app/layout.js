import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import IwbTheme from "../providers/theme";
import MainNav from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IWB",
  description: "next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
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

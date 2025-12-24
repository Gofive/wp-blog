import IwbTheme from "../providers/theme";
import MainNav from "@/components/navbar";
import Script from "next/script";

import "./globals.css";
import UpTop from "@/components/up-top";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: "IMWIND - 全栈开发工程师 | 技术博客",
    template: "%s | IMWIND",
  },
  description:
    "IMWIND 的个人网站，分享前端、后端开发技术文章，展示项目作品和技术经验。专注于 React、Next.js、Node.js 等现代 Web 开发技术。",
  keywords: [
    "IMWIND",
    "全栈开发",
    "前端开发",
    "后端开发",
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "技术博客",
    "Web开发",
    "软件工程师",
  ].join(", "),
  authors: [{ name: "IMWIND", url: "https://imwind.cc" }],
  creator: "IMWIND",
  publisher: "IMWIND",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://imwind.cc"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://imwind.cc",
    siteName: "IMWIND",
    title: "IMWIND - 全栈开发工程师 | 技术博客",
    description:
      "IMWIND 的个人网站，分享前端、后端开发技术文章，展示项目作品和技术经验。",
    images: [
      {
        url: "/iwb.png",
        width: 400,
        height: 400,
        alt: "IMWIND Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMWIND - 全栈开发工程师 | 技术博客",
    description:
      "IMWIND 的个人网站，分享前端、后端开发技术文章，展示项目作品和技术经验。",
    site: "@imwind_dev",
    creator: "@imwind_dev",
    images: ["/iwb.png"],
  },
  verification: {
    google: "G-SDZFGG4YWC",
  },
  category: "Technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className="h-full">
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
        className={`${inter.className} antialiased bg-white dark:bg-slate-800 dark:text-zinc-100 h-full overflow-hidden`}
      >
        <IwbTheme>
          <div className="flex flex-col h-full">
            <MainNav />
            <main id="main-content" className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
              <div className="container max-w-5xl">{children}</div>
            </main>
          </div>
        </IwbTheme>
      </body>
    </html>
  );
}

import dynamic from "next/dynamic";
import { personalInfo, siteConfig } from "@/data/about-data";
import { generateAboutPageStructuredData, generateSEOMetadata } from "@/lib/seo-utils";

// Dynamic import for better code splitting
const AboutPageClient = dynamic(() => import("@/components/about-page-client"), {
  loading: () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-8"></div>
        <div className="space-y-4">
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  ),
  ssr: true
});

// SEO-optimized metadata configuration using utility function
export const metadata = generateSEOMetadata({
  title: `关于 ${personalInfo.name} - ${personalInfo.title}`,
  description: `${personalInfo.bio.primary} 专注于前端和后端开发，分享技术经验和项目作品。了解我的技能、工作经历和联系方式。`,
  path: '/about',
  type: 'profile',
  keywords: [
    "技术博主",
    "软件工程师",
    "个人简历",
    "工作经历",
    "项目作品",
    "技能展示",
    "联系方式"
  ]
});



export default function AboutPage() {
  const structuredData = generateAboutPageStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      <AboutPageClient />
    </>
  );
}
import Posts from "@/components/posts";
import { getArticles } from "@/lib/read-md";
import { generateSEOMetadata, generateWebSiteStructuredData } from "@/lib/seo-utils";
import Script from "next/script";

// ISR 配置：每 3600 秒（1小时）重新验证一次页面
export const revalidate = 3600;

export const metadata = generateSEOMetadata({
  title: "IMWIND - 全栈开发工程师 | 技术博客",
  description: "IMWIND 的个人网站，分享前端、后端开发技术文章，展示项目作品和技术经验。专注于 React、Next.js、Node.js 等现代 Web 开发技术。",
  path: "/",
  keywords: ["技术博客", "全栈开发", "前端开发", "后端开发", "React", "Next.js"]
});

export default async function Home({ searchParams }) {
  const { p = 1, s = 10 } = await searchParams;
  const posts = getArticles();

  // 生成网站结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateWebSiteStructuredData()
    ]
  };

  return (
    <>
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Posts p={p} s={s} posts={posts} />
    </>
  );
}

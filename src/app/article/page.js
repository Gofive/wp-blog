import Posts from "@/components/posts";
import Tags from "@/components/tags";
import { getArticles } from "@/lib/read-md";
import React from "react";
import { generateSEOMetadata } from "@/lib/seo-utils";

// ISR 配置：每 3600 秒（1小时）重新验证一次页面
export const revalidate = 3600;

export async function generateMetadata({ searchParams }) {
  const { tag } = await searchParams;
  const title = tag 
    ? `${tag} - 技术文章 | IMWIND`
    : "技术文章 | IMWIND";
  const description = tag
    ? `浏览标签为 "${tag}" 的技术文章，涵盖前端、后端开发、架构设计等多个技术领域。`
    : "浏览 IMWIND 技术博客的所有文章，涵盖前端、后端开发、架构设计等多个技术领域。";

  return generateSEOMetadata({
    title,
    description,
    path: tag ? `/article?tag=${tag}` : "/article",
    keywords: tag ? [tag] : [],
  });
}

export default async function Article({ searchParams }) {
  const { tag, p, s } = await searchParams;
  const posts = await getArticles(tag);

  return (
    <div className="flex flex-col md:flex-row">
      <Tags tag={tag} />
      <Posts posts={posts} article tag={tag} p={p} s={s} />
    </div>
  );
}

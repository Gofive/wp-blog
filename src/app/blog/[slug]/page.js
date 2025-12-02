import { getBlog } from "@/lib/read-md";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import Slugger from "github-slugger";
import remarkFrontmatter from "remark-frontmatter";
import BlogContent from "./BlogContent";
import { generateSEOMetadata, generateBlogPostingStructuredData } from "@/lib/seo-utils";
import posts from "~/blogs/search-index.json";
import Script from "next/script";

// 生成静态路径，提升 SEO 和性能
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug),
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const blogData = await getBlog(`${decodedSlug}.md`);
  const title = blogData.frontmatter?.title || decodedSlug;
  const url = `https://imwind.cc/blog/${slug}`;
  
  // 从 search-index.json 中查找文章信息以获取 summary
  const postInfo = posts.find(p => p.slug === decodedSlug);
  const description = postInfo?.summary 
    ? postInfo.summary.replace(/\n/g, ' ').substring(0, 160).trim()
    : `${title} - IMWIND 技术博客文章`;
  
  const tags = blogData.frontmatter?.tags || [];
  const date = blogData.frontmatter?.date || new Date().toISOString().split('T')[0];

  return generateSEOMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    type: 'article',
    keywords: tags,
  });
}

/**
 * 从 Markdown 内容中提取目录
 * @param {string} markdownContent - Markdown 内容
 * @returns {Object} 包含目录数据和 HTML 内容
 */
export const parseMarkdownWithToc = async (markdownContent) => {
  const toc = []; // 存储目录
  const slugger = new Slugger(); // 初始化 github-slugger
  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree) => {
      visit(tree, "heading", (node) => {
        const level = node.depth; // 标题层级 (h1 -> 1, h2 -> 2, etc.)
        const text = node.children
          .filter((child) => child.type === "text")
          .map((child) => child.value)
          .join("");
        let id = slugger.slug(text); // 使用 github-slugger 生成 ID
        // 确保 ID 不以数字开头，HTML ID 必须以字母开头
        if (/^\d/.test(id)) {
          id = `heading-${id}`;
        }
        if (level === 2 || level === 3) {
          // 如果是 h2,h3 标题，将其添加到目录数组中
          toc.push({ level, text, id });
        }
      });
    });

  // 返回处理后的 Markdown 内容
  await processor.process(markdownContent);
  return toc;
};

export default async function Blog({ params }) {
  const slug = (await params).slug;

  // 解码中文 slug
  const decodedSlug = decodeURIComponent(slug);
  const blogData = await getBlog(`${decodedSlug}.md`);
  const title = blogData.frontmatter?.title || decodedSlug;
  const url = `https://imwind.cc/blog/${slug}`;
  
  // 从 search-index.json 中查找文章信息
  const postInfo = posts.find(p => p.slug === decodedSlug);
  const description = postInfo?.summary 
    ? postInfo.summary.replace(/\n/g, ' ').substring(0, 160).trim()
    : `${title} - IMWIND 技术博客文章`;
  
  const tags = blogData.frontmatter?.tags || [];
  const datePublished = blogData.frontmatter?.date 
    ? new Date(blogData.frontmatter.date).toISOString()
    : new Date().toISOString();

  const toc = await parseMarkdownWithToc(blogData.content);

  // 生成结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateBlogPostingStructuredData({
        title,
        description,
        url,
        datePublished,
        dateModified: datePublished,
        tags,
        image: "/iwb.png"
      })
    ]
  };

  return (
    <>
      <Script
        id={`blog-structured-data-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <BlogContent markdown={blogData.content} toc={toc} title={title} />
    </>
  );
}

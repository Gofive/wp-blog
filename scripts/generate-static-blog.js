/**
 * 静态博客生成器
 * 在构建时将所有 Markdown 文章转换为静态 HTML 页面
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";
import { visit } from "unist-util-visit";
import Slugger from "github-slugger";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOGS_DIR = path.join(process.cwd(), "blogs");
const OUTPUT_DIR = path.join(process.cwd(), "public/static-blog");
const METADATA_FILE = path.join(process.cwd(), "blogs/static-blog-metadata.json");

/**
 * 确保目录存在
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * 从 Markdown 内容中提取目录
 */
function extractToc(markdownContent) {
  const toc = [];
  const slugger = new Slugger();

  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree) => {
      visit(tree, "heading", (node) => {
        const level = node.depth;
        const text = node.children
          .filter((child) => child.type === "text")
          .map((child) => child.value)
          .join("");
        const id = slugger.slug(text);

        if (level === 2 || level === 3) {
          toc.push({ level, text, id });
        }
      });
    });

  processor.processSync(markdownContent);
  return toc;
}

/**
 * 处理代码块，添加复制按钮
 */
function addCopyButtonToCodeBlocks() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "pre" && node.children[0]?.tagName === "code") {
        const codeElement = node.children[0];
        const codeContent = codeElement.children
          .filter(child => child.type === "text")
          .map(child => child.value)
          .join("");

        // 添加复制按钮的 HTML
        const copyButton = {
          type: "element",
          tagName: "button",
          properties: {
            className: ["copy-btn"],
            "data-code": codeContent,
            title: "复制代码"
          },
          children: [
            {
              type: "element",
              tagName: "svg",
              properties: {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2"
              },
              children: [
                {
                  type: "element",
                  tagName: "rect",
                  properties: {
                    width: "14",
                    height: "14",
                    x: "8",
                    y: "8",
                    rx: "2",
                    ry: "2"
                  }
                },
                {
                  type: "element",
                  tagName: "path",
                  properties: {
                    d: "m4 16c-1.1 0-2-.9-2-2v-10c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                  }
                }
              ]
            }
          ]
        };

        // 创建包装容器
        const wrapper = {
          type: "element",
          tagName: "div",
          properties: {
            className: ["code-block-wrapper"]
          },
          children: [copyButton, node]
        };

        // 替换原节点
        Object.assign(node, wrapper);
      }
    });
  };
}

/**
 * 将 Markdown 转换为 HTML
 */
async function markdownToHtml(content) {
  const processor = remark()
    .use(remarkFrontmatter)
    .use(remarkGfm, { singleTilde: false })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypePrism, {
      ignoreMissing: true,
      showLineNumbers: true
    })
    .use(addCopyButtonToCodeBlocks)
    .use(rehypeStringify);

  const result = await processor.process(content);
  return result.toString();
}

/**
 * 生成文章的静态 HTML 页面
 */
async function generateStaticBlog() {
  console.log("🚀 开始生成静态博客页面...");

  // 确保输出目录存在
  ensureDir(OUTPUT_DIR);

  // 读取所有 Markdown 文件
  const files = fs.readdirSync(BLOGS_DIR).filter(file => file.endsWith('.md'));
  const metadata = [];

  for (const file of files) {
    const filePath = path.join(BLOGS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    const slug = file.replace('.md', '');
    console.log(`📝 处理文章: ${slug}`);

    try {
      // 提取目录
      const toc = extractToc(content);

      // 转换为 HTML
      const htmlContent = await markdownToHtml(content);

      // 生成文章元数据
      const articleMetadata = {
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || '',
        tags: frontmatter.tags || [],
        category: frontmatter.category || 'Uncategorized',
        date: frontmatter.date || new Date().toISOString(),
        toc,
        htmlContent,
        readingTime: Math.ceil(content.length / 500) // 估算阅读时间（每分钟500字符）
      };

      metadata.push(articleMetadata);

      // 保存单独的 HTML 文件（可选，用于调试）
      const htmlFilePath = path.join(OUTPUT_DIR, `${slug}.html`);
      fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');

    } catch (error) {
      console.error(`❌ 处理文章 ${slug} 时出错:`, error);
    }
  }

  // 保存所有文章的元数据
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));

  console.log(`✅ 静态博客生成完成！共处理 ${metadata.length} 篇文章`);
  console.log(`📁 HTML 文件保存在: ${OUTPUT_DIR}`);
  console.log(`📄 元数据保存在: ${METADATA_FILE}`);

  return metadata;
}

/**
 * 清理旧的静态文件
 */
function cleanStaticFiles() {
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  if (fs.existsSync(METADATA_FILE)) {
    fs.unlinkSync(METADATA_FILE);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanStaticFiles();
  generateStaticBlog().catch(console.error);
}

export {
  generateStaticBlog,
  cleanStaticFiles
};
import fs from "fs";
import path from "path";
import posts from "~/blogs/search-index.json";

// 配置 Markdown 文件存储目录
const BASE_DIR = path.join(process.cwd(), "blogs");

/**
 * 解析 Markdown frontmatter
 * @param {string} content - Markdown 内容
 * @returns {Object} { frontmatter, content }
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];

  // 简单解析 YAML frontmatter
  const frontmatter = {};
  frontmatterText.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // 移除引号
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // 处理数组格式 (简单处理)
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/['"]/g, ""));
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: markdownContent };
}

export async function getBlog(slug) {
  const filePath = path.join(BASE_DIR, slug);
  // 读取每个 Markdown 文件的内容
  const rawContent = fs.readFileSync(filePath, "utf8");
  const { frontmatter, content } = parseFrontmatter(rawContent);

  return { frontmatter, content };
}

/**
 * 根据 tag 查询所有相关的文章，按日期降序排列（最新的在前）
 * @param {string} tagName 要查询的标签
 * @returns {Array} 符合的文章列表 [{ title, slug, date, ... }]
 */
export function getArticles(tag) {
  const filteredPosts = tag
    ? posts.filter((article) => article.tags.includes(tag))
    : posts;

  // 按日期降序排序（最新的文章在前面）
  return filteredPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // 降序排列
  });
}

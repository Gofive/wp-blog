"use server";

import fs from "fs";
import path from "path";
import posts from "~/blogs/search-index.json";

// 配置 Markdown 文件存储目录
const BASE_DIR = path.join(process.cwd(), "blogs");

export async function getBlog(slug) {
  console.log(slug);
  const filePath = path.join(BASE_DIR, slug);
  // 读取每个 Markdown 文件的内容
  const content = fs.readFileSync(filePath, "utf8");
  return content;
}

/**
 * 根据 tag 查询所有相关的文章
 * @param {string} tagName 要查询的标签
 * @returns {Array} 符合的文章列表 [{ title, slug }]
 */
export async function getArticles(tag) {
  return tag ? posts.filter((article) => article.tags.includes(tag)) : posts;
}

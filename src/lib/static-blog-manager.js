/**
 * 静态博客数据管理器
 * 用于在运行时访问预生成的静态博客数据
 */

import fs from "fs";
import path from "path";

// 静态博客元数据文件路径
const METADATA_FILE = path.join(process.cwd(), "blogs/static-blog-metadata.json");

let cachedMetadata = null;

/**
 * 获取所有静态博客元数据
 */
export function getStaticBlogMetadata() {
  if (cachedMetadata) {
    return cachedMetadata;
  }

  try {
    if (fs.existsSync(METADATA_FILE)) {
      const content = fs.readFileSync(METADATA_FILE, 'utf-8');
      cachedMetadata = JSON.parse(content);
      return cachedMetadata;
    }
  } catch (error) {
    console.error('读取静态博客元数据失败:', error);
  }

  return [];
}

/**
 * 根据 slug 获取特定文章的数据
 */
export function getStaticBlogBySlug(slug) {
  const metadata = getStaticBlogMetadata();
  return metadata.find(article => article.slug === slug);
}

/**
 * 获取所有文章的 slug 列表（用于 generateStaticParams）
 */
export function getAllBlogSlugs() {
  const metadata = getStaticBlogMetadata();
  return metadata.map(article => ({ slug: article.slug }));
}

/**
 * 根据标签筛选文章
 */
export function getBlogsByTag(tag) {
  const metadata = getStaticBlogMetadata();
  return metadata.filter(article => article.tags.includes(tag));
}

/**
 * 根据分类筛选文章
 */
export function getBlogsByCategory(category) {
  const metadata = getStaticBlogMetadata();
  return metadata.filter(article => article.category === category);
}

/**
 * 获取最新的文章列表
 */
export function getLatestBlogs(limit = 10) {
  const metadata = getStaticBlogMetadata();
  return metadata
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

/**
 * 搜索文章
 */
export function searchBlogs(query) {
  const metadata = getStaticBlogMetadata();
  const lowerQuery = query.toLowerCase();

  return metadata.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * 获取所有标签及其文章数量
 */
export function getAllTags() {
  const metadata = getStaticBlogMetadata();
  const tagCounts = {};

  metadata.forEach(article => {
    article.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 获取所有分类及其文章数量
 */
export function getAllCategories() {
  const metadata = getStaticBlogMetadata();
  const categoryCounts = {};

  metadata.forEach(article => {
    const category = article.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export default {
  getStaticBlogMetadata,
  getStaticBlogBySlug,
  getAllBlogSlugs,
  getBlogsByTag,
  getBlogsByCategory,
  getLatestBlogs,
  searchBlogs,
  getAllTags,
  getAllCategories
};
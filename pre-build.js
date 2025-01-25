const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const removeMd = require("remove-markdown");
const Segment = require("segment");

const postsDirectory = path.join(process.cwd(), "blogs"); // 文章目录
const outputFilePath = path.join(process.cwd(), "blogs/search-index.json"); // 索引输出位置
const tagsPath = path.join(process.cwd(), "blogs/tags.json"); // 索引输出位置

// 读取 Markdown 文件并生成摘要
function getMarkdownSummary(content) {
  // 按行拆分并去除首尾空格
  const lines = content.split("\n").map((line) => line.trim());

  // 查找 `<!--summary-->` 位置
  const summaryIndex = lines.findIndex((line) =>
    line.includes("<!--summary-->")
  );

  if (summaryIndex !== -1) {
    // 存在 `<!--summary-->`，则提取其 **之前** 的内容作为摘要
    return lines.slice(0, summaryIndex).join("\n");
  }

  // 如果没有 `<!--summary-->`，回退到原来的摘要方案
  return getFallbackSummary(lines);
}

// 旧的摘要方案：去掉 `#` 标题前的内容，取标题后 5 行
function getFallbackSummary(lines) {
  // 找到第一个 `#` 标题的位置
  const titleIndex = lines.findIndex((line) => line.startsWith("#"));

  if (titleIndex === -1) return lines.slice(0, 5).join("\n");

  // 取标题后 5 行
  return lines.slice(titleIndex + 1, titleIndex + 6).join("\n");
}

// 纯净化文本函数
function cleanText(text) {
  // 1. 移除 Markdown 语法
  let cleaned = removeMd(text);

  // 2. 移除 HTML 标签
  cleaned = cleaned.replace(/<\/?[^>]+(>|$)/g, "");

  // 3. 移除所有特殊字符（仅保留中英文、数字、常见标点符号）
  cleaned = cleaned.replace(/[^\w\u4e00-\u9fa5.,!?]/g, "");

  return cleaned;
}

function generateSearchIndex() {
  const allPosts = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md")) // 只处理 .md 文件
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        title: data.title || file.replace(".md", ""), // 标题
        slug: file.replace(".md", ""), // 文章路径
        summary: getMarkdownSummary(content), // 保留 Markdown 格式
        content: cleanText(content), // 移除 Markdown 语法
        tags: data.tags || [], // 文章标签
        category: data.category || "Uncategorized", // 文章分类
        date: data.date || new Date().toISOString(), // 文章日期
      };
    });

  fs.writeFileSync(outputFilePath, JSON.stringify(allPosts, null, 2));
  console.log("✅  搜索索引已生成！");
}

generateSearchIndex();

// 解析 blogIndex.json
const blogIndex = JSON.parse(fs.readFileSync(outputFilePath, "utf-8"));
const tagsMap = {};

// 遍历文章，提取 tags
blogIndex.forEach((post) => {
  post.tags.forEach((tag) => {
    if (!tagsMap[tag]) {
      tagsMap[tag] = [];
    }
    tagsMap[tag].push(post.slug);
  });
});

// 格式化为数组对象
const tagsList = Object.entries(tagsMap).map(([tag, articles]) => ({
  tag,
  articles,
}));

// 写入 tags.json
fs.writeFileSync(tagsPath, JSON.stringify(tagsList, null, 2));

console.log("✅ tags.json 生成成功！");

'use server';

import fs from 'fs';
import path from 'path';

// 配置 Markdown 文件存储目录
const BASE_DIR = path.join(process.cwd(), 'blogs');

export async function getBlogs() {
  // 读取目录中的所有文件
  const files = fs.readdirSync(BASE_DIR);

  // 过滤出以 .md 结尾的文件
  const mdFiles = files.filter((file) => path.extname(file) === '.md');

  // 读取每个 Markdown 文件的内容
  const fileContents = mdFiles.map((file) => {
    const filePath = path.join(BASE_DIR, file);
  });

  return mdFiles;
}

export async function getBlog(slug) {
  console.log(slug);
  const filePath = path.join(BASE_DIR, slug);
  // 读取每个 Markdown 文件的内容
  const content = fs.readFileSync(filePath, 'utf8');
  return content;
}

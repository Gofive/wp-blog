/**
 * 测试Markdown处理器
 */

import { MarkdownProcessor } from './src/lib/markdown-processor.js';

async function testMarkdownProcessor() {
  console.log('开始测试Markdown处理器...');

  // 创建处理器实例
  const processor = new MarkdownProcessor();

  // 测试用的Markdown内容
  const testMarkdown = `---
title: '测试文章'
category: 'Technology'
date: '2025-01-24'
tags: ['test', 'markdown']
---

# 测试文章

这是一个测试文章，用于验证Markdown处理器的功能。

## 功能特性

- [x] **代码高亮** 支持语法高亮
- [x] **目录生成** 自动生成文章目录
- [x] **阅读时间** 计算预计阅读时间

<!--summary-->
这是文章摘要部分，用于在列表页面显示。
<!--/summary-->

### 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### 中文内容测试

这里是中文内容，用于测试中文字符的处理和阅读时间计算。

## 结论

Markdown处理器工作正常。
`;

  try {
    // 处理Markdown内容
    const result = await processor.processContent(testMarkdown, 'test.md');

    console.log('处理结果:');
    console.log('- 标题:', result.frontmatter.title);
    console.log('- Slug:', result.slug);
    console.log('- 字数:', result.wordCount);
    console.log('- 阅读时间:', result.readingTime, '分钟');
    console.log('- 摘要:', result.summary);
    console.log('- TOC项目数:', result.toc.length);
    console.log('- HTML长度:', result.htmlContent.length);

    console.log('\nTOC结构:');
    result.toc.forEach(item => {
      console.log(`  ${item.level === 2 ? '##' : '###'} ${item.text} (${item.id})`);
      if (item.children.length > 0) {
        item.children.forEach(child => {
          console.log(`    ${child.level === 3 ? '###' : '####'} ${child.text} (${child.id})`);
        });
      }
    });

    console.log('\n✅ Markdown处理器测试通过!');
    return true;
  } catch (error) {
    console.error('❌ 测试失败:', error);
    return false;
  }
}

// 运行测试
testMarkdownProcessor().then(success => {
  process.exit(success ? 0 : 1);
});
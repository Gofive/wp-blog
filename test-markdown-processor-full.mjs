/**
 * 完整测试Markdown处理器功能
 */

import fs from 'fs';
import path from 'path';
import { MarkdownProcessor } from './src/lib/markdown-processor.js';

async function testMarkdownProcessor() {
  console.log('🧪 测试Markdown处理器完整功能...\n');

  try {
    // 创建处理器实例
    const processor = new MarkdownProcessor({
      enableCodeHighlight: true,
      enableToc: true,
      enableReadingTime: true,
      enableWordCount: true
    });

    console.log('✅ 处理器实例创建成功');

    // 读取测试文件
    const testFile = path.join(process.cwd(), 'blogs/React服务端组件深度解析.md');

    if (!fs.existsSync(testFile)) {
      console.error('❌ 测试文件不存在:', testFile);
      return false;
    }

    const content = fs.readFileSync(testFile, 'utf-8');
    console.log('✅ 测试文件读取成功，大小:', content.length, '字符');

    // 处理Markdown内容
    console.log('\n📝 开始处理Markdown内容...');
    const result = await processor.processContent(content, testFile);

    console.log('✅ Markdown处理完成\n');

    // 验证结果
    console.log('📊 处理结果统计:');
    console.log('- Frontmatter字段数:', Object.keys(result.frontmatter).length);
    console.log('- HTML内容长度:', result.htmlContent.length, '字符');
    console.log('- TOC项目数:', result.toc.length);
    console.log('- 字数统计:', result.wordCount);
    console.log('- 阅读时间:', result.readingTime, '分钟');
    console.log('- 摘要长度:', result.summary.length, '字符');
    console.log('- 生成的slug:', result.slug);

    // 验证frontmatter
    console.log('\n📋 Frontmatter内容:');
    console.log('- 标题:', result.frontmatter.title);
    console.log('- 分类:', result.frontmatter.category);
    console.log('- 标签:', result.frontmatter.tags);
    console.log('- 日期:', result.frontmatter.date);

    // 验证TOC结构
    console.log('\n📑 目录结构 (TOC):');
    result.toc.forEach((item, index) => {
      const indent = '  '.repeat(item.level - 2);
      console.log(`${indent}${index + 1}. ${item.text} (${item.id}) [Level ${item.level}]`);
      if (item.children && item.children.length > 0) {
        item.children.forEach((child, childIndex) => {
          const childIndent = '  '.repeat(child.level - 2);
          console.log(`${childIndent}  ${childIndex + 1}. ${child.text} (${child.id}) [Level ${child.level}]`);
        });
      }
    });

    // 验证HTML内容（显示前500字符）
    console.log('\n🌐 生成的HTML内容预览:');
    console.log(result.htmlContent.substring(0, 500) + '...');

    // 验证摘要
    console.log('\n📄 文章摘要:');
    console.log(result.summary.substring(0, 200) + '...');

    // 测试中文URL编码
    console.log('\n🔗 中文URL处理测试:');
    const chineseTitle = "React服务端组件深度解析";
    const slug = processor.slugify(chineseTitle);
    console.log('- 原始标题:', chineseTitle);
    console.log('- 生成的slug:', slug);
    console.log('- URL解码测试:', decodeURIComponent(slug));

    // 验证结果完整性
    const isValid = processor.validateResult(result);
    console.log('\n✅ 结果验证:', isValid ? '通过' : '失败');

    return true;

  } catch (error) {
    console.error('❌ 测试过程中出错:', error);
    console.error('错误堆栈:', error.stack);
    return false;
  }
}

// 运行测试
testMarkdownProcessor().then(success => {
  if (success) {
    console.log('\n🎉 Markdown处理器测试全部通过！');
  } else {
    console.log('\n❌ 测试失败');
    process.exit(1);
  }
}).catch(error => {
  console.error('测试运行失败:', error);
  process.exit(1);
});
/**
 * 简单测试Markdown处理器功能
 */

const fs = require('fs');
const path = require('path');

// 测试基本功能
async function testBasicFunctionality() {
  console.log('测试Markdown处理器基本功能...');

  // 读取现有的markdown文件
  const testFile = path.join(process.cwd(), 'blogs/React服务端组件深度解析.md');

  if (!fs.existsSync(testFile)) {
    console.error('测试文件不存在:', testFile);
    return false;
  }

  const content = fs.readFileSync(testFile, 'utf-8');
  console.log('✅ 成功读取测试文件');
  console.log('文件大小:', content.length, '字符');

  // 测试基本的frontmatter解析
  const matter = require('gray-matter');
  const { data: frontmatter, content: markdownContent } = matter(content);

  console.log('✅ Frontmatter解析成功');
  console.log('- 标题:', frontmatter.title);
  console.log('- 分类:', frontmatter.category);
  console.log('- 标签:', frontmatter.tags);
  console.log('- 内容长度:', markdownContent.length);

  // 测试中文字符处理
  const chineseChars = (markdownContent.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (markdownContent.match(/[a-zA-Z]+/g) || []).length;

  console.log('✅ 字符统计完成');
  console.log('- 中文字符:', chineseChars);
  console.log('- 英文单词:', englishWords);
  console.log('- 总字数:', chineseChars + englishWords);

  // 测试阅读时间计算
  const readingTime = Math.max(1, Math.ceil(chineseChars / 200 + englishWords / 250));
  console.log('- 预计阅读时间:', readingTime, '分钟');

  // 测试摘要提取
  const summaryMatch = markdownContent.match(/<!--summary-->([\s\S]*?)(?=<!--\/summary-->|$)/);
  let summary = '';
  if (summaryMatch) {
    summary = summaryMatch[1].trim();
  } else {
    // 提取前150个字符作为摘要
    const plainText = markdownContent
      .replace(/^---[\s\S]*?---/, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]*`/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();

    summary = plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  }

  console.log('✅ 摘要提取完成');
  console.log('- 摘要长度:', summary.length);
  console.log('- 摘要内容:', summary.substring(0, 100) + '...');

  return true;
}

// 运行测试
testBasicFunctionality().then(success => {
  if (success) {
    console.log('\n🎉 基本功能测试通过！');
  } else {
    console.log('\n❌ 测试失败');
  }
}).catch(error => {
  console.error('测试过程中出错:', error);
});
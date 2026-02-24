/**
 * Markdown处理器核心模块
 * 负责将Markdown内容转换为HTML，并提取相关元数据
 */

import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';

/**
 * Markdown处理器类
 */
export class MarkdownProcessor {
  constructor(options = {}) {
    this.options = {
      enableCodeHighlight: true,
      enableToc: true,
      enableReadingTime: true,
      enableWordCount: true,
      ...options
    };

    this.remarkProcessor = this.createRemarkProcessor();
    this.rehypeProcessor = this.createRehypeProcessor();
  }

  /**
   * 创建remark处理器
   */
  createRemarkProcessor() {
    return remark()
      .use(remarkFrontmatter, ['yaml', 'toml'])
      .use(remarkGfm, { singleTilde: false })
      .use(remarkRehype, {
        allowDangerousHtml: true,
        clobberPrefix: ''
      });
  }

  /**
   * 创建rehype处理器
   */
  createRehypeProcessor() {
    let processor = rehype()
      .use(rehypeRaw)
      .use(rehypeSlug);

    if (this.options.enableCodeHighlight) {
      processor = processor.use(rehypePrismPlus, {
        ignoreMissing: true,
        showLineNumbers: true
      });
    }

    return processor.use(rehypeStringify);
  }

  /**
   * 处理Markdown内容
   * @param {string} markdownContent - 原始Markdown内容
   * @param {string} filePath - 文件路径（用于错误处理和调试）
   * @returns {Promise<Object>} 处理结果
   */
  async processContent(markdownContent, filePath = '') {
    try {
      // 1. 解析frontmatter
      const { data: frontmatter, content } = matter(markdownContent);

      // 2. 提取摘要
      const summary = this.extractSummary(content);

      // 3. 计算阅读时间和字数
      const stats = this.calculateReadingStats(content);

      // 4. 提取TOC
      const toc = this.options.enableToc ? await this.extractToc(content) : [];

      // 5. 处理Markdown转HTML
      const htmlContent = await this.convertToHtml(content);

      // 6. 生成slug（如果frontmatter中没有）
      const slug = frontmatter.slug || this.generateSlug(filePath, frontmatter.title);

      return {
        frontmatter,
        htmlContent,
        toc,
        summary,
        slug,
        ...stats,
        filePath
      };
    } catch (error) {
      console.error(`处理Markdown文件失败: ${filePath}`, error);
      throw new Error(`Markdown处理失败: ${error.message}`);
    }
  }

  /**
   * 将Markdown转换为HTML
   * @param {string} content - Markdown内容
   * @returns {Promise<string>} HTML内容
   */
  async convertToHtml(content) {
    const remarkResult = await this.remarkProcessor.process(content);
    const rehypeResult = await this.rehypeProcessor.process(remarkResult);
    return String(rehypeResult);
  }

  /**
   * 提取文章目录(TOC)
   * @param {string} content - Markdown内容
   * @returns {Promise<Array>} TOC数组
   */
  async extractToc(content) {
    const toc = [];
    const slugger = new GithubSlugger();

    // 解析Markdown AST
    const tree = this.remarkProcessor.parse(content);

    // 遍历AST提取标题
    visit(tree, 'heading', (node) => {
      if (node.depth >= 2 && node.depth <= 6) {
        const text = this.extractTextFromNode(node);
        if (text) {
          const id = slugger.slug(text);
          toc.push({
            id,
            text,
            level: node.depth,
            children: []
          });
        }
      }
    });

    // 构建层级结构
    return this.buildTocHierarchy(toc);
  }

  /**
   * 从AST节点提取文本内容
   * @param {Object} node - AST节点
   * @returns {string} 文本内容
   */
  extractTextFromNode(node) {
    let text = '';

    const extractText = (n) => {
      if (n.type === 'text') {
        text += n.value;
      } else if (n.children) {
        n.children.forEach(extractText);
      }
    };

    if (node.children) {
      node.children.forEach(extractText);
    }

    return text.trim();
  }

  /**
   * 构建TOC层级结构
   * @param {Array} flatToc - 扁平的TOC数组
   * @returns {Array} 层级化的TOC数组
   */
  buildTocHierarchy(flatToc) {
    const result = [];
    const stack = [];

    flatToc.forEach(item => {
      const newItem = { ...item, children: [] };

      // 找到合适的父级
      while (stack.length > 0 && stack[stack.length - 1].level >= newItem.level) {
        stack.pop();
      }

      if (stack.length === 0) {
        result.push(newItem);
      } else {
        stack[stack.length - 1].children.push(newItem);
      }

      stack.push(newItem);
    });

    return result;
  }

  /**
   * 提取文章摘要
   * @param {string} content - Markdown内容
   * @returns {string} 摘要
   */
  extractSummary(content) {
    // 查找 <!--summary--> 标记
    const summaryMatch = content.match(/<!--summary-->([\s\S]*?)(?=<!--\/summary-->|$)/);
    if (summaryMatch) {
      return summaryMatch[1].trim();
    }

    // 如果没有摘要标记，提取前150个字符
    const plainText = content
      .replace(/^---[\s\S]*?---/, '') // 移除frontmatter
      .replace(/```[\s\S]*?```/g, '') // 移除代码块
      .replace(/`[^`]*`/g, '') // 移除行内代码
      .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
      .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接
      .replace(/#{1,6}\s+/g, '') // 移除标题标记
      .replace(/\*\*([^*]+)\*\*/g, '$1') // 移除粗体标记
      .replace(/\*([^*]+)\*/g, '$1') // 移除斜体标记
      .replace(/\n+/g, ' ') // 替换换行为空格
      .trim();

    return this.truncateText(plainText, 150);
  }

  /**
   * 计算阅读统计信息
   * @param {string} content - Markdown内容
   * @returns {Object} 统计信息
   */
  calculateReadingStats(content) {
    const stats = {
      wordCount: 0,
      readingTime: 0
    };

    if (!this.options.enableWordCount && !this.options.enableReadingTime) {
      return stats;
    }

    // 移除代码块和其他非正文内容
    const plainText = content
      .replace(/^---[\s\S]*?---/, '') // 移除frontmatter
      .replace(/```[\s\S]*?```/g, '') // 移除代码块
      .replace(/`[^`]*`/g, '') // 移除行内代码
      .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
      .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接
      .replace(/#{1,6}\s+/g, '') // 移除标题标记
      .replace(/[*_~`]/g, '') // 移除markdown标记
      .replace(/\s+/g, ' ') // 标准化空格
      .trim();

    if (this.options.enableWordCount) {
      // 中英文混合字数统计
      const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
      const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length;
      stats.wordCount = chineseChars + englishWords;
    }

    if (this.options.enableReadingTime) {
      // 阅读时间计算（中文200字/分钟，英文250词/分钟）
      const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
      const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length;

      const chineseReadingTime = chineseChars / 200;
      const englishReadingTime = englishWords / 250;

      stats.readingTime = Math.max(1, Math.ceil(chineseReadingTime + englishReadingTime));
    }

    return stats;
  }

  /**
   * 生成文章slug
   * @param {string} filePath - 文件路径
   * @param {string} title - 文章标题
   * @returns {string} slug
   */
  generateSlug(filePath, title) {
    if (title) {
      return this.slugify(title);
    }

    // 从文件路径提取文件名作为slug
    const fileName = filePath.split('/').pop().replace(/\.md$/, '');
    return this.slugify(fileName);
  }

  /**
   * 将文本转换为URL友好的slug
   * @param {string} text - 原始文本
   * @returns {string} slug
   */
  slugify(text) {
    return text
      .toLowerCase()
      .trim()
      // 处理中文字符 - 保留中文，转换为URL编码
      .replace(/[\u4e00-\u9fa5]+/g, (match) => encodeURIComponent(match))
      // 处理英文和数字
      .replace(/[^a-z0-9\u4e00-\u9fa5%]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  }

  /**
   * 截断文本到指定长度
   * @param {string} text - 原始文本
   * @param {number} maxLength - 最大长度
   * @returns {string} 截断后的文本
   */
  truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    // 尝试在单词边界截断
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...';
    }

    return truncated + '...';
  }

  /**
   * 验证处理结果
   * @param {Object} result - 处理结果
   * @returns {boolean} 是否有效
   */
  validateResult(result) {
    const required = ['frontmatter', 'htmlContent', 'slug'];
    return required.every(field => result.hasOwnProperty(field));
  }
}

/**
 * 创建默认的Markdown处理器实例
 */
export function createMarkdownProcessor(options = {}) {
  return new MarkdownProcessor(options);
}

/**
 * 便捷函数：处理单个Markdown文件内容
 * @param {string} content - Markdown内容
 * @param {string} filePath - 文件路径
 * @param {Object} options - 处理选项
 * @returns {Promise<Object>} 处理结果
 */
export async function processMarkdown(content, filePath = '', options = {}) {
  const processor = new MarkdownProcessor(options);
  return await processor.processContent(content, filePath);
}

export default MarkdownProcessor;
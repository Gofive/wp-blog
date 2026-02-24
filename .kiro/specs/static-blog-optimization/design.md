# Design Document

## Overview

将博客系统从实时Markdown渲染优化为构建时预生成静态HTML页面。这个设计将保持现有功能的完整性，同时显著提升页面加载性能。系统将在构建阶段处理所有Markdown文件，生成优化的HTML内容和元数据。

## Architecture

### 构建时静态生成流程
```
构建阶段:
blogs/*.md → 静态生成器 → 预处理HTML + 元数据JSON

运行时:
用户请求 → 静态路由 → 预生成HTML (快速响应)
```

### 文件结构
```
blogs/
├── *.md                           # 原始Markdown文件
├── static-blog-metadata.json      # 预生成的文章元数据
├── static-html/                   # 预生成的HTML文件目录
│   ├── article-slug-1.html
│   ├── article-slug-2.html
│   └── ...
├── search-index.json             # 搜索索引 (现有)
└── tags.json                     # 标签索引 (现有)

scripts/
├── generate-static-blog.js       # 静态生成脚本
└── build-optimization.js         # 构建优化脚本

src/lib/
├── static-blog-manager.js        # 静态博客数据管理器 (已存在)
├── markdown-processor.js         # Markdown处理器
└── html-generator.js             # HTML生成器

src/components/
├── static-blog-article.js        # 静态文章组件 (已存在)
└── optimized-code-block.js       # 优化的代码块组件
```

## Components and Interfaces

### 1. 静态生成脚本 (scripts/generate-static-blog.js)
```javascript
/**
 * 主要的静态生成脚本
 * 在构建时执行，处理所有Markdown文件
 */
export class StaticBlogGenerator {
  constructor(options = {}) {
    this.blogsDir = options.blogsDir || 'blogs';
    this.outputDir = options.outputDir || 'blogs/static-html';
    this.metadataFile = options.metadataFile || 'blogs/static-blog-metadata.json';
  }

  async generateAll() {
    // 1. 扫描所有Markdown文件
    // 2. 处理每个文件生成HTML
    // 3. 生成元数据JSON
    // 4. 更新搜索索引
  }

  async processMarkdownFile(filePath) {
    // 1. 解析frontmatter
    // 2. 处理Markdown内容
    // 3. 生成HTML
    // 4. 提取TOC
    // 5. 计算阅读时间
  }
}
```

### 2. Markdown处理器 (src/lib/markdown-processor.js)
```javascript
/**
 * 处理Markdown内容，生成HTML和元数据
 */
export class MarkdownProcessor {
  constructor() {
    this.remarkProcessor = this.createRemarkProcessor();
    this.rehypeProcessor = this.createRehypeProcessor();
  }

  async processContent(markdown) {
    // 1. 解析frontmatter
    // 2. 处理Markdown语法
    // 3. 生成HTML
    // 4. 提取TOC
    // 5. 添加代码高亮
    // 6. 优化图片
  }

  createRemarkProcessor() {
    return remark()
      .use(remarkFrontmatter)
      .use(remarkGfm, { singleTilde: false })
      .use(remarkRehype, { allowDangerousHtml: true });
  }

  createRehypeProcessor() {
    return rehype()
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypePrism)
      .use(rehypeStringify);
  }
}
```

### 3. HTML生成器 (src/lib/html-generator.js)
```javascript
/**
 * 生成优化的HTML内容
 */
export class HtmlGenerator {
  constructor(options = {}) {
    this.syntaxTheme = options.syntaxTheme || 'materialOceanic';
    this.enableLineNumbers = options.enableLineNumbers || true;
  }

  async generateArticleHtml(processedContent) {
    // 1. 生成基础HTML结构
    // 2. 添加代码高亮
    // 3. 插入复制按钮
    // 4. 优化图片标签
    // 5. 添加锚点链接
  }

  generateCodeBlock(code, language) {
    // 1. 使用Prism.js生成语法高亮
    // 2. 添加复制按钮
    // 3. 添加行号 (可选)
    // 4. 优化移动端显示
  }

  generateTocHtml(toc) {
    // 生成目录HTML结构
  }
}
```

### 4. 构建集成 (package.json scripts)
```json
{
  "scripts": {
    "prebuild": "node scripts/generate-static-blog.js",
    "build": "next build",
    "predev": "node scripts/generate-static-blog.js --dev",
    "dev": "next dev --turbopack",
    "build:static": "node scripts/generate-static-blog.js --production"
  }
}
```

### 5. 增量构建支持
```javascript
/**
 * 增量构建管理器
 */
export class IncrementalBuilder {
  constructor() {
    this.cacheFile = 'blogs/.build-cache.json';
    this.cache = this.loadCache();
  }

  shouldRebuild(filePath) {
    // 比较文件修改时间
    // 检查依赖变更
    // 返回是否需要重新构建
  }

  updateCache(filePath, metadata) {
    // 更新构建缓存
  }
}
```

## Data Models

### Article Metadata
```typescript
interface ArticleMetadata {
  slug: string;                    // 文章slug
  title: string;                   // 文章标题
  description?: string;            // 文章描述
  date: string;                    // 发布日期
  tags: string[];                  // 标签数组
  category: string;                // 分类
  author?: string;                 // 作者
  readingTime: number;             // 预计阅读时间(分钟)
  wordCount: number;               // 字数统计
  htmlContent: string;             // 预生成的HTML内容
  toc: TocItem[];                  // 目录数据
  summary: string;                 // 文章摘要
  lastModified: string;            // 最后修改时间
  filePath: string;                // 原始文件路径
}
```

### Table of Contents
```typescript
interface TocItem {
  id: string;                      // 锚点ID
  text: string;                    // 标题文本
  level: number;                   // 标题层级 (2-6)
  children?: TocItem[];            // 子标题 (可选)
}
```

### Build Cache
```typescript
interface BuildCache {
  [filePath: string]: {
    lastModified: number;          // 文件最后修改时间戳
    contentHash: string;           // 内容哈希值
    dependencies: string[];        // 依赖文件列表
  };
}
```

## Error Handling

### 1. Markdown解析错误
```javascript
try {
  const processed = await markdownProcessor.processContent(content);
} catch (error) {
  console.error(`处理Markdown文件失败: ${filePath}`, error);
  // 生成错误页面HTML
  // 记录错误日志
  // 继续处理其他文件
}
```

### 2. HTML生成错误
```javascript
// 提供降级方案
if (htmlGenerationFailed) {
  // 使用简化的HTML生成
  // 保留基本的Markdown渲染
  // 记录警告信息
}
```

### 3. 文件系统错误
```javascript
// 处理文件读写错误
// 提供重试机制
// 清理临时文件
```

## Testing Strategy

### 1. 单元测试
```javascript
// 测试Markdown处理器
describe('MarkdownProcessor', () => {
  test('should process frontmatter correctly', () => {});
  test('should generate valid HTML', () => {});
  test('should extract TOC properly', () => {});
});

// 测试HTML生成器
describe('HtmlGenerator', () => {
  test('should generate syntax highlighted code', () => {});
  test('should add copy buttons to code blocks', () => {});
});
```

### 2. 集成测试
```javascript
// 测试完整的静态生成流程
describe('StaticBlogGenerator', () => {
  test('should generate all static files', () => {});
  test('should handle Chinese filenames', () => {});
  test('should update metadata correctly', () => {});
});
```

### 3. 性能测试
```javascript
// 测试构建性能
describe('Build Performance', () => {
  test('should complete build within time limit', () => {});
  test('should support incremental builds', () => {});
});
```

## Performance Optimizations

### 1. 构建时优化
- **并行处理**: 使用Worker线程并行处理多个Markdown文件
- **增量构建**: 只重新生成变更的文件
- **缓存机制**: 缓存处理结果避免重复计算
- **代码分割**: 按需加载大型依赖

### 2. 运行时优化
- **静态HTML**: 预生成的HTML直接返回，无需实时渲染
- **代码高亮**: 构建时完成语法高亮，运行时无需处理
- **图片优化**: 构建时优化图片尺寸和格式
- **CSS内联**: 关键CSS内联到HTML中

### 3. 缓存策略
```javascript
// 多层缓存策略
const cacheStrategy = {
  // 1. 构建缓存 - 避免重复处理
  buildCache: new Map(),
  
  // 2. 内存缓存 - 运行时快速访问
  memoryCache: new LRUCache({ max: 100 }),
  
  // 3. 文件缓存 - 持久化存储
  fileCache: './blogs/.cache/'
};
```

## Migration Strategy

### 1. 渐进式迁移
```javascript
// 阶段1: 保持现有功能，添加静态生成
// 阶段2: 切换到静态路由
// 阶段3: 移除旧的实时渲染代码
```

### 2. 兼容性保证
```javascript
// 保持API兼容性
export function getBlog(slug) {
  // 优先使用静态数据
  return getStaticBlogBySlug(slug) || getLegacyBlog(slug);
}
```

### 3. 回滚方案
```javascript
// 提供快速回滚到实时渲染的能力
const USE_STATIC_GENERATION = process.env.USE_STATIC_GENERATION !== 'false';
```

## Development Experience

### 1. 开发模式优化
```javascript
// 开发模式下的特殊处理
if (process.env.NODE_ENV === 'development') {
  // 启用文件监听
  // 提供热重载
  // 显示详细错误信息
}
```

### 2. 调试工具
```javascript
// 提供构建分析工具
export function analyzeBuild() {
  // 显示构建统计
  // 分析性能瓶颈
  // 检查文件大小
}
```

### 3. 错误报告
```javascript
// 友好的错误信息
class BuildError extends Error {
  constructor(message, filePath, lineNumber) {
    super(`${message}\n  at ${filePath}:${lineNumber}`);
  }
}
```
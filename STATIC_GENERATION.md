# WP-Blog 项目配置

## CSS 状态

项目已恢复原始的 `globals.css` 文件配置：

### 📊 **当前状态**
- **文件大小**: 1632行
- **完整功能**: 保留所有原有样式和功能
- **兼容性**: 确保所有组件正常工作

### 🎯 **功能特性**
- ✅ 完整的shadcn/ui颜色系统
- ✅ 全面的GitHub Markdown主题
- ✅ 深色/浅色模式支持
- ✅ 代码语法高亮
- ✅ 响应式设计
- ✅ 组件特定样式优化

### 🔧 **技术栈**
- **CSS变量**: 完整的颜色系统
- **字体**: 系统优化字体栈
- **主题**: 自动深色模式适配
- **兼容性**: 跨浏览器支持

## 字体配置

项目已配置使用技术博客流行的字体：

### 正文字体 (系统优化)
- **主字体**: Inter (现代无衬线字体)
- **中文字体**: PingFang SC (macOS/iOS), Microsoft YaHei (Windows)
- **备选字体**: sans-serif
- **优化**: 抗锯齿渲染，1.8倍行高
- **特点**: 系统字体优先，确保最佳流畅度和兼容性

### 等宽字体 (Monospace)
- **代码字体**: Fira Code, JetBrains Mono, SF Mono, Monaco, Cascadia Code, Roboto Mono, Consolas, Courier New
- **特点**: 优秀的代码显示，包含连字支持

### CSS 配置
```css
/* 全局字体变量 */
:root {
  --font-inter: Inter, "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-mono: 'Fira Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}

/* 应用字体和优化 */
body {
  font-family: var(--font-inter);
  -webkit-font-smoothing: antialiased;
  line-height: 1.8;
}
```

### CSS 配置
```css
/* 全局字体变量 */
:root {
  --font-inter: var(--font-inter, 'Inter', 'Source Sans Pro', 'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif);
  --font-mono: 'Fira Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}

/* 应用字体 */
body {
  font-family: var(--font-inter);
}

code, pre, kbd, samp {
  font-family: var(--font-mono) !important;
}
```

## 静态生成配置

项目已配置为使用 **Incremental Static Regeneration (ISR)**，在构建时预生成静态页面，并支持按需更新。

## 配置概述

### ISR 设置

所有主要页面都配置了 ISR，每 1 小时（3600 秒）重新验证一次：

```javascript
export const revalidate = 3600;
```

### 静态生成页面

以下页面在构建时生成静态 HTML：

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 博客文章列表，支持分页 |
| 博客详情 | `/blog/[slug]` | 根据所有博客文章生成静态页面 |
| 关于页面 | `/about` | 个人介绍页面 |
| 文章列表 | `/article` | 按标签筛选的文章列表 |
| 搜索页面 | `/search` | 客户端搜索（不生成静态） |

## 工作原理

### 构建时静态生成

```bash
pnpm build
```

构建过程：
1. 运行 `pre-build.js` 生成搜索索引
2. 执行 `generateStaticParams()` 生成所有博客 slug
3. 为每个 slug 生成静态 HTML
4. 执行 `postbuild` 生成 sitemap

### 按需重新验证

- 当页面访问时间超过 1 小时，Next.js 会在后台重新生成该页面
- 重新生成期间，用户仍看到旧页面（缓存）
- 新页面生成完成后，下一次请求会返回新内容

### 手动触发重新生成

更新 Markdown 文件后，可以：

1. **重新部署**：推送代码到 Git 仓库，触发构建
2. **使用 Webhook**：配置 CI/CD 自动部署
3. **API 路由触发**：创建 API 路由手动触发重新验证

## 代码实现

### 博客详情页 (`src/app/blog/[slug]/page.js`)

```javascript
// ISR 配置：每 1 小时重新验证
export const revalidate = 3600;

// 生成所有静态路径
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug),
  }));
}

// 页面组件
export default async function Blog({ params }) {
  const blogData = await getBlog(`${slug}.md`);
  // ...
}
```

### 首页 (`src/app/page.js`)

```javascript
// ISR 配置：每 1 小时重新验证
export const revalidate = 3600;

export default async function Home({ searchParams }) {
  const posts = getArticles();
  // ...
}
```

## 性能优势

### 构建前（动态渲染）

- 每次请求都读取 Markdown 文件
- 解析 Markdown 内容
- 渲染 HTML
- 响应时间：~200-500ms

### 构建后（静态生成）

- 直接返回预生成的 HTML
- 无需文件读取和解析
- 响应时间：~5-20ms
- CDN 缓存友好

## 客户端搜索

搜索页面 (`/search`) 采用客户端渲染，原因：

1. 搜索功能需要实时响应
2. 用户输入内容不断变化
3. 使用 Fuse.js 在浏览器端进行模糊搜索

```javascript
"use client";

import Fuse from "fuse.js";
import searchIndex from "~/blogs/search-index.json";

export default function SearchClient({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery);
  const posts = query ? searchPosts(query) : [];
  
  function searchPosts(query) {
    const fuse = new Fuse(searchIndex, {
      keys: ["title", "tags", "content"],
    });
    return fuse.search(query);
  }
  
  // ...
}
```

## 更新博客文章

### 方法 1：重新部署（推荐）

```bash
# 修改或添加 Markdown 文件
cd blogs
# 编辑文件...

# 提交并推送
git add .
git commit -m "Add new blog post"
git push
```

部署平台（Vercel/Netlify）会自动重新构建和部署。

### 方法 2：手动触发重新验证

创建 API 路由 `src/app/api/revalidate/route.js`：

```javascript
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  const { slug } = await request.json();
  
  if (slug) {
    revalidatePath(`/blog/${slug}`);
    return Response.json({ revalidated: true });
  }
  
  revalidatePath('/');
  return Response.json({ revalidated: true, now: Date.now() });
}
```

然后调用 API：

```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"slug": "your-post-slug"}'
```

## 构建输出

构建完成后，静态页面位于：

```
.next/
└── server/
    └── app/
        ├── page.html           # 首页
        ├── about/
        │   └── page.html       # 关于页
        ├── article/
        │   └── page.html       # 文章列表页
        └── blog/
            └── [slug]/
                └── page.html   # 所有博客文章
```

## SEO 优化

静态生成带来的 SEO 优势：

1. **快速 First Contentful Paint (FCP)**
2. **完全可爬取**（无需 JavaScript）
3. **更好的 Core Web Vitals**
4. **支持结构化数据**

## 注意事项

### 1. 文件系统访问

构建时所有文件必须可访问：

```javascript
export async function generateStaticParams() {
  // ✅ 正确：构建时读取
  const posts = await getAllPosts();
  
  // ❌ 错误：运行时才读取
  // const posts = fs.readdirSync('blogs');
}
```

### 2. 环境变量

确保 `.env` 中包含所有必要的变量：

```env
# Next.js 环境变量
NODE_ENV=production

# 可选：Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. 内存限制

如果博客文章很多（>1000 篇），可能需要：

1. 增加构建内存限制
2. 使用 `output: 'export'` 纯静态导出
3. 分批生成页面

## 监控和调试

### 检查页面是否静态生成

1. 查看构建日志：
```bash
pnpm build
```

2. 检查输出：
```
✓ Generating static pages (6/6)
  ✓ /blog/post-1
  ✓ /blog/post-2
  ✓ /about
  ✓ /article
  ✓ /search
  ✓ /
```

### 检查页面响应头

```bash
curl -I https://your-domain.com/blog/some-post
```

查看 `X-Nextjs-Cache` 响应头：
- `HIT`: 缓存命中
- `MISS`: 缓存未命中
- `STALE`: 使用过期缓存

## 故障排除

### 问题：构建时找不到 Markdown 文件

**解决方案**：
确保 `pre-build.js` 在 `prebuild` 钩子中执行：
```json
{
  "scripts": {
    "prebuild": "node pre-build.js",
    "predev": "node pre-build.js"
  }
}
```

### 问题：页面没有静态生成

**解决方案**：
1. 检查是否使用了 `"use server"`
2. 确保 `generateStaticParams` 返回正确格式
3. 验证 `getBlog` 函数在构建时可执行

### 问题：内容更新后没有立即生效

**解决方案**：
- 这是 ISR 的正常行为
- 等待 1 小时或手动触发重新验证
- 使用 `revalidatePath` API

## 进一步优化

### 1. 纯静态导出

如果不需要 ISR，可以使用纯静态导出：

```javascript
// next.config.mjs
export default {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

### 2. 使用 CDN

将生成的静态文件部署到 CDN：
- Vercel Edge Network
- Cloudflare Pages
- Netlify Edge Functions

### 3. 预加载关键资源

在 `layout.js` 中添加预加载：

```javascript
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin />
```

## 参考资料

- [Next.js Static Generation](https://nextjs.org/docs/app/building-your-application/rendering/static-generation)
- [Next.js Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/rendering/incremental-static-regeneration)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

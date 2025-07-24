# Design Document

## Overview

About 页面将采用现代化的单页面设计，与现有博客保持一致的视觉风格。页面将使用 Next.js App Router 架构，支持服务端渲染，并集成现有的主题系统和响应式设计。

## Architecture

### 页面结构
```
/about
├── page.js (主页面组件)
├── components/
│   ├── hero-section.js (个人介绍区域)
│   ├── skills-section.js (技能展示区域)
│   ├── experience-section.js (工作经历区域)
│   ├── projects-section.js (项目展示区域)
│   └── contact-section.js (联系方式区域)
```

### 技术栈集成
- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS (与现有系统一致)
- **图标**: Lucide React (与现有组件一致)
- **动画**: Motion (与导航栏动画保持一致)
- **主题**: next-themes (集成现有暗黑模式)

## Components and Interfaces

### 1. About Page (主页面)
```jsx
// src/app/about/page.js
export const metadata = {
  title: "About - IMWIND",
  description: "了解更多关于我的信息",
  "og:title": "About - IMWIND",
  "og:url": "https://imwind.cc/about",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
```

### 2. Hero Section (个人介绍区域)
```jsx
// src/components/about/hero-section.js
export default function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48 relative rounded-full overflow-hidden">
          <Image src="/avatar.jpg" alt="Profile" fill className="object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">你的姓名</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
            全栈开发工程师 | 技术博主
          </p>
          <p className="text-lg leading-relaxed">
            个人简介描述...
          </p>
        </div>
      </div>
    </section>
  );
}
```

### 3. Skills Section (技能展示)
```jsx
// src/components/about/skills-section.js
const skillCategories = [
  {
    title: "前端开发",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      // ...
    ]
  },
  // ...
];

export default function SkillsSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">技术技能</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <SkillCategory key={category.title} category={category} />
        ))}
      </div>
    </section>
  );
}
```

### 4. Experience Section (工作经历)
```jsx
// src/components/about/experience-section.js
const experiences = [
  {
    company: "公司名称",
    position: "职位",
    duration: "2022 - 至今",
    description: "工作描述...",
    technologies: ["React", "Node.js", "AWS"]
  },
  // ...
];

export default function ExperienceSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">工作经历</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} />
        ))}
      </div>
    </section>
  );
}
```

### 5. Projects Section (项目展示)
```jsx
// src/components/about/projects-section.js
const projects = [
  {
    title: "项目名称",
    description: "项目描述...",
    technologies: ["React", "Next.js", "Tailwind"],
    github: "https://github.com/...",
    demo: "https://demo.com",
    image: "/project1.jpg"
  },
  // ...
];

export default function ProjectsSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">项目作品</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
```

### 6. Contact Section (联系方式)
```jsx
// src/components/about/contact-section.js
const contacts = [
  { type: "email", value: "your@email.com", icon: Mail },
  { type: "github", value: "github.com/username", icon: Github },
  { type: "linkedin", value: "linkedin.com/in/username", icon: Linkedin },
];

export default function ContactSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">联系我</h2>
      <div className="flex justify-center space-x-8">
        {contacts.map((contact) => (
          <ContactLink key={contact.type} contact={contact} />
        ))}
      </div>
    </section>
  );
}
```

## Data Models

### Personal Information
```typescript
interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location?: string;
}
```

### Skill Category
```typescript
interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}
```

### Work Experience
```typescript
interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  logo?: string;
}
```

### Project
```typescript
interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
}
```

### Contact Information
```typescript
interface Contact {
  type: 'email' | 'github' | 'linkedin' | 'twitter' | 'website';
  value: string;
  icon: LucideIcon;
  url?: string;
}
```

## Error Handling

### 1. 图片加载失败
- 提供默认头像和项目图片
- 使用 Next.js Image 组件的 fallback 机制

### 2. 数据获取错误
- 静态数据存储在组件中，避免外部依赖
- 提供优雅的降级显示

### 3. 响应式布局
- 使用 Tailwind 的响应式类名
- 测试各种屏幕尺寸的显示效果

## Testing Strategy

### 1. 组件测试
- 测试各个 section 组件的渲染
- 验证响应式布局在不同屏幕尺寸下的表现
- 测试暗黑模式切换

### 2. 集成测试
- 测试页面整体布局和导航
- 验证与现有博客系统的集成
- 测试 SEO 元数据

### 3. 用户体验测试
- 测试页面加载性能
- 验证动画和交互效果
- 测试移动端体验

## Design System Integration

### 1. 颜色方案
- 使用现有的 Tailwind 配置
- 支持 light/dark 主题切换
- 与博客文章页面保持一致的配色

### 2. 字体和排版
- 使用 markdown-body 类的字体设置
- 保持与博客内容一致的行高和间距
- 响应式字体大小

### 3. 组件样式
- 复用现有的卡片样式 (如博客文章卡片)
- 使用一致的按钮和链接样式
- 保持统一的圆角和阴影效果

### 4. 动画效果
- 使用 Motion 库添加页面进入动画
- 技能条的进度动画
- 悬停效果和过渡动画

## Performance Considerations

### 1. 图片优化
- 使用 Next.js Image 组件
- 提供适当的图片尺寸和格式
- 实现懒加载

### 2. 代码分割
- 按 section 分割组件
- 使用动态导入优化首屏加载

### 3. SEO 优化
- 设置适当的 metadata
- 使用语义化 HTML 标签
- 提供结构化数据
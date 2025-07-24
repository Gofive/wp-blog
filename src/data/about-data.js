/**
 * About Page Data Configuration
 * Centralized data management for the about page
 */

import { Mail, Github, Linkedin, Twitter, Globe, MessageCircle } from "lucide-react";

// Personal Information Configuration
export const personalInfo = {
  name: "IMWIND",
  title: "全栈开发工程师 | 技术博主",
  bio: {
    primary: "热爱技术，专注于前端和后端开发。喜欢分享技术心得，探索新的开发技术和最佳实践。",
    secondary: "在这里，我分享我的技术经验、项目作品和对技术发展的思考。欢迎与我交流讨论！"
  },
  avatar: {
    src: "/iwb.png",
    alt: "IMWIND Profile Avatar",
    fallbackInitials: "IW"
  },
  location: "中国",
  timezone: "Asia/Shanghai"
};

// Skills Configuration
export const skillCategories = [
  {
    id: "frontend",
    title: "前端开发",
    skills: [
      {
        name: "React",
        level: 90,
        color: "from-blue-400 to-blue-600",
        category: "framework"
      },
      {
        name: "Next.js",
        level: 85,
        color: "from-gray-700 to-gray-900",
        category: "framework"
      },
      {
        name: "TypeScript",
        level: 80,
        color: "from-blue-500 to-blue-700",
        category: "language"
      },
      {
        name: "Vue.js",
        level: 75,
        color: "from-green-400 to-green-600",
        category: "framework"
      },
      {
        name: "Tailwind CSS",
        level: 88,
        color: "from-cyan-400 to-cyan-600",
        category: "styling"
      },
      {
        name: "JavaScript",
        level: 92,
        color: "from-yellow-400 to-yellow-600",
        category: "language"
      }
    ]
  },
  {
    id: "backend",
    title: "后端开发",
    skills: [
      {
        name: "Node.js",
        level: 85,
        color: "from-green-500 to-green-700",
        category: "runtime"
      },
      {
        name: "Python",
        level: 78,
        color: "from-blue-400 to-yellow-500",
        category: "language"
      },
      {
        name: "PostgreSQL",
        level: 80,
        color: "from-blue-600 to-blue-800",
        category: "database"
      },
      {
        name: "MongoDB",
        level: 75,
        color: "from-green-600 to-green-800",
        category: "database"
      },
      {
        name: "Redis",
        level: 70,
        color: "from-red-500 to-red-700",
        category: "cache"
      },
      {
        name: "GraphQL",
        level: 72,
        color: "from-pink-500 to-purple-600",
        category: "api"
      }
    ]
  },
  {
    id: "tools",
    title: "工具与平台",
    skills: [
      {
        name: "Git",
        level: 90,
        color: "from-orange-500 to-red-600",
        category: "version-control"
      },
      {
        name: "Docker",
        level: 75,
        color: "from-blue-500 to-blue-700",
        category: "containerization"
      },
      {
        name: "AWS",
        level: 70,
        color: "from-orange-400 to-orange-600",
        category: "cloud"
      },
      {
        name: "Vercel",
        level: 85,
        color: "from-gray-800 to-black",
        category: "deployment"
      },
      {
        name: "Webpack",
        level: 78,
        color: "from-blue-400 to-blue-600",
        category: "build-tool"
      },
      {
        name: "Vite",
        level: 82,
        color: "from-purple-500 to-blue-600",
        category: "build-tool"
      }
    ]
  }
];

// Work Experience Configuration
export const experiences = [
  {
    id: "senior-fullstack-2022",
    company: "科技创新公司",
    position: "高级全栈开发工程师",
    duration: "2022年3月 - 至今",
    startDate: "2022-03",
    endDate: null, // null indicates current position
    description: "负责公司核心产品的前后端开发，主导技术架构设计和团队技术方案制定。参与多个大型项目的开发和维护，优化系统性能，提升用户体验。",
    responsibilities: [
      "设计和开发高性能的 Web 应用程序",
      "负责前端架构设计和技术选型",
      "优化应用性能，提升用户体验",
      "指导初级开发人员，进行代码审查"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    type: "full-time",
    location: "远程"
  },
  {
    id: "frontend-dev-2020",
    company: "互联网科技公司",
    position: "前端开发工程师",
    duration: "2020年6月 - 2022年2月",
    startDate: "2020-06",
    endDate: "2022-02",
    description: "专注于前端开发，参与多个企业级项目的开发。负责组件库的设计和维护，提升开发效率和代码质量。",
    responsibilities: [
      "开发和维护企业级前端应用",
      "设计和实现可复用的组件库",
      "与设计师和后端工程师协作",
      "参与技术方案讨论和制定"
    ],
    technologies: ["Vue.js", "React", "JavaScript", "Sass", "Webpack", "Git"],
    type: "full-time",
    location: "北京"
  },
  {
    id: "junior-frontend-2019",
    company: "软件开发公司",
    position: "初级前端开发工程师",
    duration: "2019年3月 - 2020年5月",
    startDate: "2019-03",
    endDate: "2020-05",
    description: "作为团队的初级开发人员，主要负责网站前端功能的实现和维护。在这个阶段快速学习和成长，掌握了现代前端开发技术栈。",
    responsibilities: [
      "实现网站前端功能和界面",
      "修复 bug 和优化用户界面",
      "学习和应用新的前端技术",
      "参与项目需求分析和讨论"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "PHP"],
    type: "full-time",
    location: "上海"
  }
];

// Projects Configuration
export const projects = [
  {
    id: "personal-blog",
    title: "个人博客系统",
    description: "基于 Next.js 15 构建的现代化博客系统，支持 Markdown 文章、标签分类、搜索功能和暗黑模式。采用服务端渲染优化 SEO，集成 Tailwind CSS 实现响应式设计。",
    technologies: ["Next.js", "React", "Tailwind CSS", "Markdown", "Lucide Icons"],
    links: {
      github: "https://github.com/username/blog",
      demo: "https://imwind.cc"
    },
    image: "/projects/blog-preview.svg",
    featured: true,
    status: "active",
    category: "web-development",
    startDate: "2023-01",
    endDate: null
  },
  {
    id: "task-manager",
    title: "任务管理应用",
    description: "全栈任务管理应用，支持项目创建、任务分配、进度跟踪和团队协作。使用 React 构建前端界面，Node.js + Express 提供 API 服务，PostgreSQL 存储数据。",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Socket.io"],
    links: {
      github: "https://github.com/username/task-manager",
      demo: "https://task-demo.com"
    },
    image: "/projects/task-manager-preview.svg",
    featured: false,
    status: "completed",
    category: "full-stack",
    startDate: "2022-08",
    endDate: "2022-12"
  },
  {
    id: "ecommerce-frontend",
    title: "电商平台前端",
    description: "现代化电商平台前端应用，包含商品展示、购物车、用户认证、订单管理等功能。使用 Vue.js 3 和 Composition API，集成 Pinia 状态管理和 Element Plus UI 组件库。",
    technologies: ["Vue.js", "Pinia", "Element Plus", "Axios", "Vue Router"],
    links: {
      github: "https://github.com/username/ecommerce-frontend",
      demo: "https://ecommerce-demo.com"
    },
    image: "/projects/ecommerce-preview.svg",
    featured: false,
    status: "completed",
    category: "frontend",
    startDate: "2022-03",
    endDate: "2022-07"
  },
  {
    id: "data-dashboard",
    title: "数据可视化仪表板",
    description: "企业级数据可视化仪表板，支持多种图表类型、实时数据更新和交互式筛选。使用 React + D3.js 构建，集成 WebSocket 实现实时数据推送。",
    technologies: ["React", "D3.js", "WebSocket", "Chart.js", "Material-UI"],
    links: {
      github: "https://github.com/username/dashboard",
      demo: "https://dashboard-demo.com"
    },
    image: "/projects/dashboard-preview.svg",
    featured: true,
    status: "active",
    category: "data-visualization",
    startDate: "2023-06",
    endDate: null
  },
  {
    id: "mobile-app",
    title: "移动端 App",
    description: "跨平台移动应用，提供用户社交、内容分享和实时聊天功能。使用 React Native 开发，支持 iOS 和 Android 平台，集成推送通知和地理位置服务。",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "AsyncStorage"],
    links: {
      github: "https://github.com/username/mobile-app"
    },
    image: "/projects/mobile-app-preview.svg",
    featured: false,
    status: "in-progress",
    category: "mobile",
    startDate: "2023-09",
    endDate: null
  },
  {
    id: "api-platform",
    title: "API 服务平台",
    description: "RESTful API 服务平台，提供用户认证、数据管理和第三方集成功能。使用 Node.js + Express 构建，集成 MongoDB 数据库和 Redis 缓存，支持 Docker 部署。",
    technologies: ["Node.js", "Express", "MongoDB", "Redis", "Docker", "JWT"],
    links: {
      github: "https://github.com/username/api-platform",
      demo: "https://api-docs.com"
    },
    image: "/projects/api-platform-preview.svg",
    featured: false,
    status: "completed",
    category: "backend",
    startDate: "2021-10",
    endDate: "2022-02"
  }
];

// Contact Information Configuration
export const contacts = [
  {
    id: "email",
    type: "email",
    label: "邮箱",
    value: "contact@imwind.cc",
    url: "mailto:contact@imwind.cc",
    icon: Mail,
    color: "from-red-500 to-pink-500",
    hoverColor: "hover:from-red-600 hover:to-pink-600",
    primary: true,
    public: true
  },
  {
    id: "github",
    type: "github",
    label: "GitHub",
    value: "github.com/gofive",
    url: "https://github.com/gofive",
    icon: Github,
    color: "from-gray-700 to-gray-900",
    hoverColor: "hover:from-gray-800 hover:to-black",
    primary: true,
    public: true
  },
  {
    id: "linkedin",
    type: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/imwind",
    url: "https://linkedin.com/in/imwind",
    icon: Linkedin,
    color: "from-blue-600 to-blue-800",
    hoverColor: "hover:from-blue-700 hover:to-blue-900",
    primary: false,
    public: true
  },
  {
    id: "twitter",
    type: "twitter",
    label: "Twitter",
    value: "@imwind_dev",
    url: "https://twitter.com/imwind_dev",
    icon: Twitter,
    color: "from-sky-400 to-blue-500",
    hoverColor: "hover:from-sky-500 hover:to-blue-600",
    primary: false,
    public: true
  },
  {
    id: "website",
    type: "website",
    label: "个人网站",
    value: "imwind.cc",
    url: "https://imwind.cc",
    icon: Globe,
    color: "from-green-500 to-emerald-600",
    hoverColor: "hover:from-green-600 hover:to-emerald-700",
    primary: false,
    public: true
  },
  {
    id: "wechat",
    type: "wechat",
    label: "微信",
    value: "imwind_dev",
    url: "#",
    icon: MessageCircle,
    color: "from-green-400 to-green-600",
    hoverColor: "hover:from-green-500 hover:to-green-700",
    primary: false,
    public: false // WeChat might be considered more private
  }
];

// Site Configuration
export const siteConfig = {
  name: "IMWIND",
  title: "IMWIND - 全栈开发工程师",
  description: "IMWIND 的个人网站，分享技术文章、项目作品和开发经验",
  url: "https://imwind.cc",
  author: {
    name: "IMWIND",
    email: "contact@imwind.cc"
  },
  social: {
    github: "https://github.com/gofive",
    twitter: "https://twitter.com/imwind_dev"
  },
  locale: "zh-CN",
  timezone: "Asia/Shanghai"
};

// Export all data as a single object for easy importing
export const aboutData = {
  personalInfo,
  skillCategories,
  experiences,
  projects,
  contacts,
  siteConfig
};

export default aboutData;
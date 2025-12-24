/**
 * About Page Data Configuration
 * Centralized data management for the about page
 */

import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Globe,
  MessageCircle,
} from "lucide-react";

// Personal Information Configuration
export const personalInfo = {
  name: "IMWIND",
  title: "全栈开发 | 技术架构",
  bio: {
    primary:
      "热爱技术，专注于前端和后端开发。喜欢分享技术心得，探索新的开发技术和最佳实践。",
    secondary:
      "在这里，我分享我的技术经验、项目作品和对技术发展的思考。欢迎与我交流讨论！",
  },
  avatar: {
    src: "/iwb.png",
    alt: "IMWIND Profile Avatar",
    fallbackInitials: "IW",
  },
  location: "中国",
  timezone: "Asia/Shanghai",
};

// Skills Configuration
export const skillCategories = [
  {
    id: "backend",
    title: "后端开发",
    skills: [
      {
        name: "Node.js",
        level: 85,
        color: "from-green-500 to-green-700",
        category: "runtime",
      },
      {
        name: "Java",
        level: 90,
        color: "from-blue-400 to-yellow-500",
        category: "language",
      },
      {
        name: "PostgreSQL",
        level: 80,
        color: "from-blue-600 to-blue-800",
        category: "database",
      },
      {
        name: "Mysql",
        level: 80,
        color: "from-green-600 to-green-800",
        category: "database",
      },
      {
        name: "Redis",
        level: 70,
        color: "from-red-500 to-red-700",
        category: "cache",
      },
      {
        name: "Nginx",
        level: 82,
        color: "from-purple-500 to-blue-600",
        category: "server",
      },
      {
        name: "Kafka",
        level: 70,
        color: "from-pink-500 to-pink-600",
        category: "message-queue",
      },
    ],
  },
  {
    id: "frontend",
    title: "前端开发",
    skills: [
      {
        name: "React",
        level: 90,
        color: "from-blue-400 to-blue-600",
        category: "framework",
      },
      {
        name: "Next.js",
        level: 85,
        color: "from-gray-700 to-gray-900",
        category: "framework",
      },
      {
        name: "TypeScript",
        level: 80,
        color: "from-blue-500 to-blue-700",
        category: "language",
      },
      {
        name: "Tailwind CSS",
        level: 88,
        color: "from-cyan-400 to-cyan-600",
        category: "styling",
      },
      {
        name: "JavaScript",
        level: 92,
        color: "from-yellow-400 to-yellow-600",
        category: "language",
      },
    ],
  },
  {
    id: "tools",
    title: "工具与平台",
    skills: [
      {
        name: "Git",
        level: 90,
        color: "from-orange-500 to-red-600",
        category: "version-control",
      },
      {
        name: "Docker",
        level: 75,
        color: "from-blue-500 to-blue-700",
        category: "containerization",
      },
      {
        name: "阿里云",
        level: 70,
        color: "from-orange-400 to-orange-600",
        category: "cloud",
      },
      {
        name: "Vite",
        level: 80,
        color: "from-gray-800 to-black",
        category: "deployment",
      },
      {
        name: "Webpack",
        level: 70,
        color: "from-blue-400 to-blue-600",
        category: "build-tool",
      },
    ],
  },
];

// Work Experience Configuration
export const experiences = [
  {
    id: "senior-fullstack-2022",
    company: "某新闻出版公司",
    position: "技术经理",
    duration: "2012年3月 - 至今",
    startDate: "2012-03",
    endDate: null, // null indicates current position
    description:
      "负责公司核心产品的前后端开发，主导技术架构设计和团队技术方案制定。参与多个大型项目的开发和维护，优化系统性能，提升用户体验。",
    responsibilities: [
      "设计和开发高性能分布式系统",
      "负责前后端架构设计和技术选型",
      "优化应用性能，提升用户体验",
      "指导初级开发人员，进行代码审查",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Mysql",
      "Redis",
      "Spring Boot",
    ],
    type: "full-time",
    location: "合肥",
  },
  {
    id: "frontend-dev-2020",
    company: "互联网科技公司",
    position: "前端开发工程师",
    duration: "2010年10月 - 2011年12月",
    startDate: "2010-10",
    endDate: "2011-12",
    description:
      "专注于后端开发，参与多个企业级项目的开发。负责具体业务逻辑的实现和维护，提升开发效率和代码质量。",
    responsibilities: [
      "开发和维护企业级应用",
      "设计和实现可复用的组件",
      "参与技术方案讨论和制定",
    ],
    technologies: ["Java", "Mysql", "JavaScript", "Svn"],
    type: "full-time",
    location: "北京",
  },
];

// Projects Configuration
export const projects = [
  {
    id: "rag-customer-service",
    title: "RAG 智能客服系统架构设计",
    description: "基于 LLM 和 RAG 技术构建的智能客服解决方案，实现企业私有知识库的高效检索与实时问答。",
    responsibilities: "负责向量数据库（Milvus）的选型与集成，优化文档分片算法，并主导 Prompt Engineering 提升回答准确度。",
    results: "问答准确率提升至 90% 以上，显著降低了人工客服压力，响应时间缩短至 2s 以内。",
    technologies: ["LLM", "RAG", "Milvus", "Python", "LangChain"],
    links: {},
    featured: true,
    startDate: "2024-01",
    category: "AI",
    status: "active",
  },
  {
    id: "spring-cloud-edu",
    title: "Spring Cloud Alibaba 分布式课后服务平台",
    description: "微服务架构的在线教育项目，提供一站式课后服务管理，支撑高并发业务场景。",
    responsibilities: "设计并主导核心微服务治理，利用 Nacos 实现配置与服务中心，通过 Kafka 处理大规模异步通知。",
    results: "支撑 5w+ 同时在线用户，实现服务高可用与动态扩缩容，系统稳定性达 99.99%。",
    technologies: ["Spring Boot", "Nacos", "Redis", "MySQL", "Kafka"],
    links: {},
    featured: true,
    startDate: "2023-06",
    category: "Education",
    status: "completed",
  },
  {
    id: "ecommerce-system",
    title: "微服务分布式在线商城",
    description: "高性能电商平台，模块化设计涵盖搜索、秒杀、购物车及订单结算等核心流程。",
    responsibilities: "主导秒杀模块设计，利用 Redis 分布式锁保障一致性，采用 MQ 实现订单异步解耦。",
    results: "成功支撑流量峰值，秒杀抗压能力提升 10 倍，订单处理延迟降低 60%。",
    technologies: ["Spring Boot", "Nacos", "Redis", "MySQL", "Kafka"],
    links: {},
    featured: true,
    startDate: "2022-12",
    category: "E-commerce",
    status: "completed",
  },
  {
    id: "tauri-edu-client",
    title: "Tauri 教育平台 Windows 客户端",
    description: "跨平台轻量级桌面客户端，为师生提供流畅的线下互动与在线学习入口。",
    responsibilities: "使用 Rust 编写底层文件 system 交互，结合 React 实现 UI 渲染与跨进程通信优化。",
    results: "体积减小 90%，内存占用降低 70%，在低端教学电脑上依然保持极致流畅。",
    technologies: ["Tauri", "Rust", "React", "Windows API"],
    links: {},
    featured: true,
    startDate: "2023-10",
    category: "Desktop",
    status: "active",
  },
];

// Contact Information Configuration
export const contacts = [
  {
    id: "email",
    type: "email",
    label: "邮箱",
    value: "pengstu@gmail.com",
    url: "mailto:pengstu@gmail.com",
    icon: Mail,
    color: "from-red-500 to-pink-500",
    hoverColor: "hover:from-red-600 hover:to-pink-600",
    primary: true,
    public: true,
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
    public: true,
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
    public: true,
  },
];

// Site Configuration
export const siteConfig = {
  name: "IMWIND",
  title: "IMWIND - 全栈开发工程师",
  description: "IMWIND 的个人网站，分享技术文章、项目作品和开发经验",
  url: "https://imwind.cc",
  author: {
    name: "IMWIND",
    email: "pengstu@gmail.com",
  },
  social: {
    github: "https://github.com/gofive",
  },
  locale: "zh-CN",
  timezone: "Asia/Shanghai",
};

// Export all data as a single object for easy importing
export const aboutData = {
  personalInfo,
  skillCategories,
  experiences,
  projects,
  contacts,
  siteConfig,
};

export default aboutData;

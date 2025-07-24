/**
 * SEO Utilities for IMWIND Website
 * Provides functions for generating structured data and SEO metadata
 */

import { personalInfo, siteConfig, experiences, projects } from "@/data/about-data";

/**
 * Generate Person structured data for about page
 */
export function generatePersonStructuredData() {
  const baseUrl = siteConfig.url;

  return {
    "@type": "Person",
    "@id": `${baseUrl}/about#person`,
    name: personalInfo.name,
    alternateName: personalInfo.name,
    description: personalInfo.bio.primary,
    url: `${baseUrl}/about`,
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}${personalInfo.avatar.src}`,
      width: 400,
      height: 400,
      caption: personalInfo.avatar.alt
    },
    jobTitle: personalInfo.title,
    worksFor: {
      "@type": "Organization",
      name: experiences[0]?.company || "科技创新公司"
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
      addressRegion: personalInfo.location
    },
    sameAs: [
      "https://github.com/gofive",
      "https://twitter.com/imwind_dev",
      "https://linkedin.com/in/imwind"
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Full Stack Development",
      "Web Development",
      "Software Engineering",
      "PostgreSQL",
      "MongoDB"
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "全栈开发工程师",
      occupationLocation: {
        "@type": "Country",
        name: "China"
      },
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "PostgreSQL",
        "MongoDB",
        "Vue.js",
        "Python"
      ]
    }
  };
}

/**
 * Generate WebSite structured data
 */
export function generateWebSiteStructuredData() {
  const baseUrl = siteConfig.url;

  return {
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    inLanguage: "zh-CN",
    publisher: {
      "@id": `${baseUrl}/about#person`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate WebPage structured data
 */
export function generateWebPageStructuredData(pageUrl, title, description, breadcrumbs = [], includeBreadcrumbs = false) {
  const baseUrl = siteConfig.url;

  const webPageData = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description: description,
    inLanguage: "zh-CN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}#website`
    }
  };

  // Only include breadcrumbs if explicitly requested
  if (includeBreadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbList = {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首页",
          item: baseUrl
        },
        ...breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: crumb.name,
          item: crumb.url
        }))
      ]
    };
    webPageData.breadcrumb = breadcrumbList;
  }

  return webPageData;
}

/**
 * Generate ProfilePage structured data
 */
export function generateProfilePageStructuredData() {
  const baseUrl = siteConfig.url;

  return {
    "@type": "ProfilePage",
    "@id": `${baseUrl}/about#profilepage`,
    url: `${baseUrl}/about`,
    name: `${personalInfo.name} - 个人简历`,
    description: `${personalInfo.name}的个人简历页面，包含技能、工作经历、项目作品和联系方式`,
    inLanguage: "zh-CN",
    mainEntity: {
      "@id": `${baseUrl}/about#person`
    }
  };
}

/**
 * Generate complete structured data for about page
 */
export function generateAboutPageStructuredData() {
  const baseUrl = siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@graph": [
      generatePersonStructuredData(),
      generateWebPageStructuredData(
        `${baseUrl}/about`,
        `关于 ${personalInfo.name} - ${personalInfo.title}`,
        personalInfo.bio.primary,
        [],
        false
      ),
      generateWebSiteStructuredData(),
      generateProfilePageStructuredData()
    ]
  };
}

/**
 * Generate Organization structured data for work experience
 */
export function generateOrganizationStructuredData(experience) {
  return {
    "@type": "Organization",
    name: experience.company,
    description: `${personalInfo.name} 在 ${experience.company} 担任 ${experience.position}`,
    employee: {
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate
    }
  };
}

/**
 * Generate SoftwareApplication structured data for projects
 */
export function generateProjectStructuredData(project) {
  const baseUrl = siteConfig.url;

  return {
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Person",
      name: personalInfo.name,
      url: `${baseUrl}/about`
    },
    programmingLanguage: project.technologies,
    codeRepository: project.links?.github,
    url: project.links?.demo,
    image: project.image ? `${baseUrl}${project.image}` : undefined,
    dateCreated: project.startDate,
    dateModified: project.endDate || new Date().toISOString().split('T')[0]
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData() {
  return {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "IMWIND 是谁？",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${personalInfo.name} 是一名${personalInfo.title}，${personalInfo.bio.primary}`
        }
      },
      {
        "@type": "Question",
        name: "IMWIND 擅长什么技术？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "主要技术栈包括 React、Next.js、Node.js、TypeScript、JavaScript、PostgreSQL、MongoDB 等现代 Web 开发技术。"
        }
      },
      {
        "@type": "Question",
        name: "如何联系 IMWIND？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可以通过邮箱 contact@imwind.cc、GitHub (github.com/gofive) 或 LinkedIn 联系我。"
        }
      }
    ]
  };
}

/**
 * Generate SEO metadata for pages
 */
export function generateSEOMetadata({
  title,
  description,
  path = '',
  image = personalInfo.avatar.src,
  type = 'website',
  keywords = []
}) {
  const baseUrl = siteConfig.url;
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = title.includes('IMWIND') ? title : `${title} | IMWIND`;

  const defaultKeywords = [
    'IMWIND',
    '全栈开发',
    '前端开发',
    '后端开发',
    'React',
    'Next.js',
    'Node.js',
    'JavaScript',
    'TypeScript'
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    authors: [{ name: personalInfo.name, url: baseUrl }],
    creator: personalInfo.name,
    publisher: personalInfo.name,
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 400,
          height: 400,
          alt: `${title} - IMWIND`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: '@imwind_dev',
      creator: '@imwind_dev',
      images: [`${baseUrl}${image}`],
    },
  };
}

export default {
  generatePersonStructuredData,
  generateWebSiteStructuredData,
  generateWebPageStructuredData,
  generateProfilePageStructuredData,
  generateAboutPageStructuredData,
  generateOrganizationStructuredData,
  generateProjectStructuredData,
  generateFAQStructuredData,
  generateSEOMetadata
};
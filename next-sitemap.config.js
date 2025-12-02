const posts = require('./blogs/search-index.json');

module.exports = {
  siteUrl: "https://imwind.cc",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // 排除不需要索引的页面
  exclude: ['/search/*', '/api/*'],
  // 自定义路径配置
  additionalPaths: async (config) => {
    const result = [];
    
    // 添加所有博客文章
    posts.forEach((post) => {
      const slug = encodeURIComponent(post.slug);
      result.push({
        loc: `/blog/${slug}`,
        lastmod: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      });
    });
    
    return result;
  },
  // 默认路径配置
  transform: async (config, path) => {
    // 为博客文章设置更高的优先级
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    // 首页和关于页面的优先级
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    if (path === '/about') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }
    
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    };
  },
};

const posts = require('./blogs/search-index.json');

module.exports = {
  siteUrl: 'https://imwind.cc',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // 排除不需要索引的页面
  exclude: ['/search/*', '/api/*'],

  // 默认路径配置
  transform: async (config, path) => {
    // 1. 致命伤修复：确保 URL 是经过转义的（Percent-encoded）
    // 使用 encodeURI 处理完整路径，确保中文字符和空格被正确转义
    const encodedPath = encodeURI(path);

    // 2. 日期格式优化：使用简单的 YYYY-MM-DD 格式，提高兼容性
    const lastmodDate = new Date().toISOString().split('T')[0];

    // 首页优先级最高
    if (path === '/') {
      return {
        loc: encodedPath,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: lastmodDate,
      };
    }

    // 博客文章配置
    if (path.startsWith('/blog/')) {
      // 尝试从索引中获取文章的原始发布日期
      const slug = decodeURIComponent(path.replace('/blog/', ''));
      const post = posts.find((p) => p.slug === slug);

      return {
        loc: encodedPath,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: post && post.date ? post.date.split('T')[0] : lastmodDate,
      };
    }

    // 关于页面
    if (path === '/about') {
      return {
        loc: encodedPath,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: lastmodDate,
      };
    }

    // 其他页面
    return {
      loc: encodedPath,
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: lastmodDate,
    };
  },
};

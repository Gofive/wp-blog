/**
 * Script to generate placeholder project images
 * This would typically be replaced with actual project screenshots
 */

const fs = require('fs');
const path = require('path');

// Simple SVG generator for project placeholders
function generateProjectSVG(title, width = 600, height = 400, color = '#3b82f6') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <rect x="20" y="20" width="${width - 40}" height="60" fill="rgba(255,255,255,0.9)" rx="8"/>
    <text x="30" y="50" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#1f2937">${title}</text>
    <rect x="20" y="100" width="${width - 40}" height="${height - 140}" fill="rgba(255,255,255,0.7)" rx="8"/>
    <circle cx="${width / 2}" cy="${height / 2 + 20}" r="40" fill="rgba(255,255,255,0.8)"/>
    <text x="${width / 2}" y="${height / 2 + 30}" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle" fill="#6b7280">项目预览</text>
  </svg>`;
}

// Project configurations
const projects = [
  { name: 'blog-preview', title: '个人博客系统', color: '#3b82f6' },
  { name: 'task-manager-preview', title: '任务管理应用', color: '#10b981' },
  { name: 'ecommerce-preview', title: '电商平台前端', color: '#f59e0b' },
  { name: 'dashboard-preview', title: '数据可视化仪表板', color: '#8b5cf6' },
  { name: 'mobile-app-preview', title: '移动端应用', color: '#ef4444' },
  { name: 'api-platform-preview', title: 'API服务平台', color: '#06b6d4' }
];

// Generate SVG files
const publicDir = path.join(process.cwd(), 'public', 'projects');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

projects.forEach(project => {
  const svg = generateProjectSVG(project.title, 600, 400, project.color);
  const filePath = path.join(publicDir, `${project.name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Generated: ${project.name}.svg`);
});

console.log('All project placeholder images generated successfully!');
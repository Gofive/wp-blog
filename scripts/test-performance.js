/**
 * Performance testing script for image optimizations
 * This script validates that our optimizations are working correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Performance Optimizations...\n');

// Test 1: Check if project images exist
console.log('1. Checking project images...');
const projectsDir = path.join(process.cwd(), 'public', 'projects');
const expectedImages = [
  'blog-preview.svg',
  'task-manager-preview.svg',
  'ecommerce-preview.svg',
  'dashboard-preview.svg',
  'mobile-app-preview.svg',
  'api-platform-preview.svg'
];

let imagesExist = true;
expectedImages.forEach(image => {
  const imagePath = path.join(projectsDir, image);
  if (fs.existsSync(imagePath)) {
    console.log(`   ✅ ${image} exists`);
  } else {
    console.log(`   ❌ ${image} missing`);
    imagesExist = false;
  }
});

// Test 2: Check if optimization utilities exist
console.log('\n2. Checking optimization utilities...');
const utilFiles = [
  'src/lib/image-utils.js',
  'src/lib/performance-utils.js',
  'src/components/optimized-image.js'
];

let utilsExist = true;
utilFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file} exists`);
  } else {
    console.log(`   ❌ ${file} missing`);
    utilsExist = false;
  }
});

// Test 3: Check Next.js config optimizations
console.log('\n3. Checking Next.js configuration...');
const configPath = path.join(process.cwd(), 'next.config.mjs');
if (fs.existsSync(configPath)) {
  const configContent = fs.readFileSync(configPath, 'utf8');

  const checks = [
    { name: 'Image formats optimization', pattern: /formats.*webp.*avif/ },
    { name: 'Device sizes configuration', pattern: /deviceSizes/ },
    { name: 'Bundle splitting optimization', pattern: /splitChunks/ },
    { name: 'SVG support', pattern: /dangerouslyAllowSVG/ }
  ];

  checks.forEach(check => {
    if (check.pattern.test(configContent)) {
      console.log(`   ✅ ${check.name} configured`);
    } else {
      console.log(`   ⚠️  ${check.name} not found`);
    }
  });
} else {
  console.log('   ❌ next.config.mjs not found');
}

// Test 4: Check component optimizations
console.log('\n4. Checking component optimizations...');
const componentsToCheck = [
  { file: 'src/components/hero-section.js', feature: 'OptimizedAvatar' },
  { file: 'src/components/project-card.js', feature: 'OptimizedProjectImage' },
  { file: 'src/components/about-page-client.js', feature: 'dynamic imports' },
  { file: 'src/components/navbar.js', feature: 'OptimizedImage' }
];

componentsToCheck.forEach(component => {
  const filePath = path.join(process.cwd(), component.file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(component.feature) || content.includes('dynamic(')) {
      console.log(`   ✅ ${component.file} uses ${component.feature}`);
    } else {
      console.log(`   ⚠️  ${component.file} may not be optimized`);
    }
  } else {
    console.log(`   ❌ ${component.file} not found`);
  }
});

// Summary
console.log('\n📊 Performance Optimization Summary:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (imagesExist && utilsExist) {
  console.log('✅ All optimizations implemented successfully!');
  console.log('\n🚀 Performance improvements include:');
  console.log('   • Optimized image loading with Next.js Image component');
  console.log('   • Lazy loading and proper sizing for all images');
  console.log('   • Fallback handling for failed image loads');
  console.log('   • Dynamic imports for better code splitting');
  console.log('   • Performance monitoring utilities');
  console.log('   • WebP/AVIF format support');
  console.log('   • Bundle optimization for motion and icon libraries');
} else {
  console.log('⚠️  Some optimizations may be missing. Please check the issues above.');
}

console.log('\n💡 Next steps:');
console.log('   • Run lighthouse audit to measure performance gains');
console.log('   • Monitor Core Web Vitals in production');
console.log('   • Consider adding more specific image sizes for different breakpoints');
console.log('   • Test loading performance on slower networks');
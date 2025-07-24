import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/**
 * @type {import('next').NextConfig}
 */
export default (phase, { defaultConfig }) => {
  const nextConfig = {
    ...defaultConfig,
    experimental: {
      turbo: {
        rules: {
          "*.svg": {
            loaders: ["@svgr/webpack"],
            options: { icon: true },
            as: "*.js",
          },
        },
      },
    },

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "oss.timetbb.com",
          port: "",
        },
      ],
      // Image optimization settings
      formats: ['image/webp', 'image/avif'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Performance optimizations
    compiler: {
      removeConsole: phase !== PHASE_DEVELOPMENT_SERVER,
    },

    // Webpack optimizations
    webpack: (config, { dev, isServer }) => {
      // Optimize bundle splitting
      if (!dev && !isServer) {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            motion: {
              name: 'motion',
              test: /[\\/]node_modules[\\/](motion|framer-motion)[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            lucide: {
              name: 'lucide',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              chunks: 'all',
              priority: 25,
            },
          },
        };
      }

      return config;
    },
  };
  return nextConfig;
};

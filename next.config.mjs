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
    },
    webpack(config, { isServer, nextRuntime }) {
      if (nextRuntime === "nodejs") {
        console.log("🚀 运行自定义构建函数...");
      }
      return config;
    },
  };
  return nextConfig;
};

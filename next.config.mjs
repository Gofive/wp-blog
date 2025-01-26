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
  };
  return nextConfig;
};

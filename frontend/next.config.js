/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    const apiDest = process.env.NEXT_API_URL || "http://localhost:5000/api";
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${apiDest}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

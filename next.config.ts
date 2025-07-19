import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pixabay.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

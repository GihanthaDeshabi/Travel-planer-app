import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Only ignore if you want to skip TypeScript errors too
    ignoreBuildErrors: false,
  },

  images:{
    remotePatterns:[
      {
       hostname:"0f07h0e5qp.ufs.sh",
        protocol:"https",
        
      },
    ],
  },
};

export default nextConfig;

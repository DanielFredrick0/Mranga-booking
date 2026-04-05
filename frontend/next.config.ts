import type { NextConfig } from "next";

const nextConfig: NextConfig = process.env.VERCEL
  ? {}
  : {
      turbopack: {
        root: __dirname,
      },
    };

export default nextConfig;

import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "zhuwenyu.art",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default withContentlayer(nextConfig);

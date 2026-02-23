// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://palestinian-lion-rejected-encyclopedia.trycloudflare.com/:path*',
      },
    ];
  },
};

export default nextConfig;

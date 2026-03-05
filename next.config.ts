// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://13.232.17.99:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://13.235.33.191/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

Then update env variables to:
```
NEXT_PUBLIC_API_BASE_URL = 
NEXT_PUBLIC_API_URL =

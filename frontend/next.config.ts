import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
 
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
  ],


  images: {
    
    remotePatterns: [
      
      {
        protocol: 'https',
        hostname: 'themewagon.github.io',
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
     
        {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
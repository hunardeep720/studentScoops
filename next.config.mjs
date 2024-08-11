import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other configurations can be added here
  images: {
    domains: [
      'images.pexels.com',
      'cdn.example.com',
      'i.pinimg.com',
      'splash.com',
      'pintrest.com',
      'firebasestorage.googleapis.com',
      'upload.wikimedia.org',
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('.');
    return config;
  },
};

export default nextConfig;
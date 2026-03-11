/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/icons', 'styled-components'],
};

export default nextConfig;

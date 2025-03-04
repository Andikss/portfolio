/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staticGeneration: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
        ],
    }
};

export default nextConfig;
